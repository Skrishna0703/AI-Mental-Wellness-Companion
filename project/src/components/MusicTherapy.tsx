import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Volume2, Heart, Star } from 'lucide-react';
import { Mood, MusicPlaylist } from '../types';
import { musicPlaylists } from '../utils/moodData';

interface MusicTherapyProps {
  selectedMood: Mood;
  onSessionComplete?: (duration: number, rating?: number) => void;
}

export const MusicTherapy: React.FC<MusicTherapyProps> = ({ selectedMood, onSessionComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [duration, setDuration] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playlist = musicPlaylists.find(p => p.mood === selectedMood.id) || musicPlaylists[0];
  const track = playlist.tracks[currentTrack];

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || track.duration);
      });
      audioRef.current.addEventListener('timeupdate', () => {
        setProgress(audioRef.current?.currentTime || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        handleNextTrack();
      });
      audioRef.current.addEventListener('error', (e) => {
        console.warn('Audio loading failed, using fallback duration');
        setDuration(track.duration);
      });
    }
  }, [track.duration]);

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current && track.url) {
      audioRef.current.src = track.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          console.warn('Auto-play failed, user interaction required');
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, track.url, isPlaying]);

  // Demo mode progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !track.url) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= track.duration) {
            handleNextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track.url, track.duration]);

  const togglePlayPause = async () => {
    if (!sessionStartTime && !isPlaying) {
      setSessionStartTime(new Date());
    }

    if (track.url && audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Audio playback error:', error);
        // Fallback to demo mode
        setIsPlaying(!isPlaying);
      }
    } else {
      // Demo mode
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextTrack = () => {
    setCurrentTrack(prev => (prev + 1) % playlist.tracks.length);
    setProgress(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrack(prev => prev > 0 ? prev - 1 : playlist.tracks.length - 1);
    setProgress(0);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
  };

  const handleStopSession = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (sessionStartTime) {
      const sessionDuration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
      if (sessionDuration > 30) { // Only show rating for sessions longer than 30 seconds
        setShowRating(true);
      } else if (onSessionComplete) {
        onSessionComplete(sessionDuration);
        setSessionStartTime(null);
      }
    }
  };

  const handleRatingSubmit = () => {
    if (sessionStartTime && onSessionComplete) {
      const sessionDuration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
      onSessionComplete(sessionDuration, rating);
    }
    setShowRating(false);
    setRating(0);
    setSessionStartTime(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="metadata" />
      
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 12c0-2.043-.777-3.908-2.05-5.314a1 1 0 010-1.343z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M13.828 7.172a1 1 0 011.414 0A5.983 5.983 0 0117 12a5.983 5.983 0 01-1.758 4.828 1 1 0 01-1.414-1.414A3.987 3.987 0 0015 12a3.987 3.987 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{playlist.name}</h2>
        <p className="text-gray-600">{playlist.description}</p>
      </div>

      {/* Album Art & Track Info */}
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-8">
        <div className="relative">
          <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 shadow-2xl flex items-center justify-center">
            <div className="text-white text-6xl animate-pulse">
              {selectedMood.emoji}
            </div>
          </div>
          {isPlaying && (
            <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
          )}
        </div>

        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{track.title}</h3>
          <p className="text-xl text-gray-600 mb-4">{track.artist}</p>
          
          {/* Session Timer */}
          {sessionStartTime && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                🎵 Session in progress: {formatTime(Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000))}
              </p>
            </div>
          )}
          
          {/* Audio Status */}
          {!track.url && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                🎵 Demo Mode: Using sample audio tracks for demonstration
              </p>
            </div>
          )}
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration || track.duration)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 cursor-pointer">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300 ease-linear"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
            <button 
              onClick={handlePrevTrack}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <SkipForward className="w-5 h-5 text-gray-700 rotate-180" />
            </button>
            
            <button 
              onClick={togglePlayPause}
              className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            
            <button 
              onClick={handleNextTrack}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <SkipForward className="w-5 h-5 text-gray-700" />
            </button>

            {sessionStartTime && (
              <button 
                onClick={handleStopSession}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors text-sm font-medium"
              >
                End Session
              </button>
            )}
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-gray-600" />
            <div className="flex-1 max-w-32">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <span className="text-sm text-gray-600 w-8">{volume}%</span>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          Curated for Your Mood
        </h4>
        <div className="space-y-2">
          {playlist.tracks.map((t, index) => (
            <div 
              key={t.id}
              onClick={() => handleTrackSelect(index)}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                index === currentTrack 
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className={`font-medium ${index === currentTrack ? 'text-purple-800' : 'text-gray-800'}`}>
                    {t.title}
                  </h5>
                  <p className={`text-sm ${index === currentTrack ? 'text-purple-600' : 'text-gray-600'}`}>
                    {t.artist}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {index === currentTrack && isPlaying && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-4 bg-purple-500 animate-pulse"></div>
                      <div className="w-1 h-3 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1 h-5 bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                  <span className="text-sm text-gray-500">{formatTime(t.duration)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Rate Your Session</h3>
            <p className="text-gray-600 text-center mb-6">How did this music therapy session make you feel?</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-full transition-colors ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  <Star className="w-8 h-8 fill-current" />
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRating(false);
                  setRating(0);
                  if (sessionStartTime && onSessionComplete) {
                    const sessionDuration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
                    onSessionComplete(sessionDuration);
                  }
                  setSessionStartTime(null);
                }}
                className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
              >
                Skip
              </button>
              <button
                onClick={handleRatingSubmit}
                disabled={rating === 0}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};