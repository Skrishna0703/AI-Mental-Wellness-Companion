import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set up your Supabase project.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_sessions: {
        Row: {
          id: string
          user_id: string
          type: 'music' | 'breathing' | 'meditation'
          mood: string
          duration: number
          rating: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'music' | 'breathing' | 'meditation'
          mood: string
          duration: number
          rating?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'music' | 'breathing' | 'meditation'
          mood?: string
          duration?: number
          rating?: number | null
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          favorite_genres: string[]
          default_session_length: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          favorite_genres?: string[]
          default_session_length?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          favorite_genres?: string[]
          default_session_length?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}