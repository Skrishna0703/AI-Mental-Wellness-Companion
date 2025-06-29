import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { WellnessSession } from '../types'

export const useWellnessSessions = () => {
  const [sessions, setSessions] = useState<WellnessSession[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchSessions()
    } else {
      // Load from localStorage for non-authenticated users
      const savedSessions = localStorage.getItem('wellness-sessions')
      if (savedSessions) {
        setSessions(JSON.parse(savedSessions).map((session: any) => ({
          ...session,
          timestamp: new Date(session.timestamp)
        })))
      }
      setLoading(false)
    }
  }, [user])

  const fetchSessions = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      const formattedSessions: WellnessSession[] = data.map(session => ({
        id: session.id,
        type: session.type,
        mood: session.mood,
        duration: session.duration,
        timestamp: new Date(session.created_at),
        rating: session.rating || undefined
      }))

      setSessions(formattedSessions)
    } catch (error) {
      console.error('Error fetching sessions:', error)
    } finally {
      setLoading(false)
    }
  }

  const addSession = async (type: WellnessSession['type'], mood: string, duration: number, rating?: number) => {
    const newSession: WellnessSession = {
      id: Date.now().toString(),
      type,
      mood,
      duration,
      timestamp: new Date(),
      rating
    }

    if (user) {
      try {
        const { error } = await supabase
          .from('user_sessions')
          .insert({
            user_id: user.id,
            type,
            mood,
            duration,
            rating: rating || null
          })

        if (error) throw error

        // Refresh sessions from database
        await fetchSessions()
      } catch (error) {
        console.error('Error saving session:', error)
        // Fallback to local storage
        setSessions(prev => [newSession, ...prev])
      }
    } else {
      // Save to localStorage for non-authenticated users
      setSessions(prev => {
        const updated = [newSession, ...prev]
        localStorage.setItem('wellness-sessions', JSON.stringify(updated))
        return updated
      })
    }
  }

  return {
    sessions,
    loading,
    addSession,
    refetch: fetchSessions
  }
}