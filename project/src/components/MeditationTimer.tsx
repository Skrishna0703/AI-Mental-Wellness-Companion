import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { AnimatedEmoji } from './AnimatedEmoji';

const ambientSounds = [
  { 
    id: 'rain', 
    name: 'Rain', 
    emoji: '🌧️', 
    description: 'Gentle rainfall',
    url: 'https://www.soundjay.com/misc/sounds/rain-01.wav' // Fallback URL
  },
  { 
    id: 'ocean', 
    name: 'Ocean Waves', 
    emoji: '🌊', 
    description: 'Rhythmic ocean sounds',
    url: 'https://www.soundjay.com/misc/sounds/ocean-wave-1.wav' // Fallback URL
  },
  { 
    id: 'forest', 
    name: 'Forest', 
    emoji: '🌲', 
    description: 'Birds and rustling leaves',
    url: 'https://www.soundjay.com/misc/sounds/forest-1.wav' // Fallback URL
  },
  { 
    id: 'silence', 
    name: 'Silence', 
    emoji: '🤫', 
    description: 'Pure quiet meditation',
    url: null
  }
];

const presetTimes = [5, 10, 15, 20, 30, 45, 60];

interface MeditationTimerProps {
  onSessionComplete?: (duration: number, rating?: number) => void;
}

export const MeditationTimer: React.FC<MeditationTimerProps> = ({ onSessionComplete }) => {
  const [duration, setDuration] = useState(10); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isActive, setIsActive] = useState(false);
  const [selectedSound, setSelectedSound] = useState(ambientSounds[0]);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [audioError, setAudioError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      stopAmbientSound();
      handleSessionComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Initialize Web Audio API for synthetic sounds
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const createSyntheticSound = (type: string) => {
    if (!audioContextRef.current) return;

    // Stop any existing sound
    stopSyntheticSound();

    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    switch (type) {
      case 'rain':
        // Create rain-like white noise
        const bufferSize = audioContext.sampleRate * 2;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.1; // Low volume white noise
        }
        
        const whiteNoise = audioContext.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;
        
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;
        
        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.value = isMuted ? 0 : volume / 100 * 0.3;
        whiteNoise.start();
        break;
        
      case 'ocean':
        // Create ocean wave-like sound with low frequency oscillation
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(0.5, audioContext.currentTime);
        
        const lfoGain = audioContext.createGain();
        lfoGain.gain.value = 200;
        
        const lfo = audioContext.createOscillator();
        lfo.frequency.value = 0.1;
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = isMuted ? 0 : volume / 100 * 0.2;
        
        lfo.start();
        oscillator.start();
        break;
        
      case 'forest':
        // Create forest-like filtered noise with bird chirps
        const forestBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const forestData = forestBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          forestData[i] = (Math.random() * 2 - 1) * 0.05;
        }
        
        const forestNoise = audioContext.createBufferSource();
        forestNoise.buffer = forestBuffer;
        forestNoise.loop = true;
        
        const forestFilter = audioContext.createBiquadFilter();
        forestFilter.type = 'bandpass';
        forestFilter.frequency.value = 2000;
        forestFilter.Q.value = 0.5;
        
        forestNoise.connect(forestFilter);
        forestFilter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.value = isMuted ? 0 : volume / 100 * 0.2;
        forestNoise.start();
        break;
    }
  };

  const stopSyntheticSound = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current = null;
    }
  };

  const playAmbientSound = async () => {
    if (selectedSound.id === 'silence') return;

    setAudioError(false);

    // Try to play actual audio file first
    if (selectedSound.url && audioRef.current) {
      try {
        audioRef.current.src = selectedSound.url;
        audioRef.current.loop = true;
        audioRef.current.volume = isMuted ? 0 : volume / 100;
        await audioRef.current.play();
        return;
      } catch (error) {
        console.warn('Failed to play audio file, falling back to synthetic sound:', error);
        setAudioError(true);
      }
    }

    // Fallback to synthetic sounds
    createSyntheticSound(selectedSound.id);
  };

  const stopAmbientSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    stopSyntheticSound();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
    stopAmbientSound();
    setSessionStartTime(null);
  };

  const toggleTimer = async () => {
    if (!isActive) {
      setSessionStartTime(new Date());
      setIsActive(true);
      await playAmbientSound();
    } else {
      setIsActive(false);
      stopAmbientSound();
    }
  };

  const handleSessionComplete = () => {
    if (sessionStartTime) {
      const sessionDuration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
      if (sessionDuration > 60) { // Only show rating for sessions longer than 1 minute
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

  const handleSoundChange = async (sound: typeof ambientSounds[0]) => {
    const wasPlaying = isActive;
    if (wasPlaying) {
      stopAmbientSound();
    }
    
    setSelectedSound(sound);
    
    if (wasPlaying && sound.id !== 'silence') {
      // Small delay to ensure the previous sound is stopped
      setTimeout(() => {
        playAmbientSound();
      }, 100);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;
  const isComplete = timeLeft === 0;

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 animate-fade-in">
      {/* Hidden audio element */}
      <audio ref={audioRef} preload="none" />
      
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Meditation Timer
            </h2>
            <div className="absolute -top-2 -right-2">
              <AnimatedEmoji emoji="🧘" size="md" animation="float" />
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
          <AnimatedEmoji emoji="🕯️" size="sm" animation="pulse" />
          Find your inner peace with guided meditation
          <AnimatedEmoji emoji="✨" size="sm" animation="float" />
        </p>
      </div>

      {/* Duration Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <AnimatedEmoji emoji="⏰" size="sm" animation="bounce" />
          Session Length
        </h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {presetTimes.map((time) => (
            <button
              key={time}
              onClick={() => {
                setDuration(time);
                if (!isActive) setTimeLeft(time * 60);
              }}
              disabled={isActive}
              className={`px-4 py-2 rounded-full transition-all duration-200 ${
                duration === time
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {time}min
            </button>
          ))}
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-8">
          <svg className="w-80 h-80 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-gray-200 dark:text-gray-700"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Timer Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                {isComplete ? (
                  <>
                    <AnimatedEmoji emoji="🎉" size="sm" animation="bounce" />
                    Session Complete!
                    <AnimatedEmoji emoji="✨" size="sm" animation="pulse" />
                  </>
                ) : isActive ? (
                  <>
                    <AnimatedEmoji emoji="🧘" size="sm" animation="float" />
                    Meditating...
                    <AnimatedEmoji emoji="💫" size="sm" animation="pulse" />
                  </>
                ) : (
                  <>
                    <AnimatedEmoji emoji="🌟" size="sm" animation="pulse" />
                    Ready to begin
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Session Timer */}
        {sessionStartTime && isActive && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl">
            <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
              <AnimatedEmoji emoji="🧘" size="sm" animation="pulse" />
              Session in progress: {formatTime(Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000))}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 group"
          >
            <RotateCcw className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:rotate-180 transition-transform duration-300" />
          </button>
          
          <button
            onClick={toggleTimer}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-3 group"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 ml-1 group-hover:scale-110 transition-transform duration-200" />
                {isComplete ? 'Start New Session' : 'Start'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ambient Sounds */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Ambient Sounds
          {audioError && (
            <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
              Using synthetic sounds
            </span>
          )}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {ambientSounds.map((sound) => (
            <button
              key={sound.id}
              onClick={() => handleSoundChange(sound)}
              className={`p-4 rounded-xl transition-all duration-200 group ${
                selectedSound.id === sound.id
                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 border-2 border-purple-300 dark:border-purple-600 scale-105'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent hover:scale-105'
              }`}
            >
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                <AnimatedEmoji 
                  emoji={sound.emoji} 
                  size="lg" 
                  animation={selectedSound.id === sound.id && isActive ? 'pulse' : 'float'}
                />
              </div>
              <h4 className={`font-medium text-sm mb-1 ${
                selectedSound.id === sound.id ? 'text-purple-800 dark:text-purple-200' : 'text-gray-800 dark:text-gray-200'
              }`}>
                {sound.name}
              </h4>
              <p className={`text-xs ${
                selectedSound.id === sound.id ? 'text-purple-600 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400'
              }`}>
                {sound.description}
              </p>
              {selectedSound.id === sound.id && isActive && sound.id !== 'silence' && (
                <div className="mt-2 flex justify-center">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-purple-500 animate-pulse"></div>
                    <div className="w-1 h-2 bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Volume Control */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200" />
            ) : (
              <Volume2 className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200" />
            )}
          </button>
          <div className="flex-1 max-w-48">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${volume}%, #E5E7EB ${volume}%, #E5E7EB 100%)`
              }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{volume}%</span>
        </div>
      </div>

      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/20 dark:border-gray-700/20 animate-scale-in">
            <div className="text-center">
              <div className="text-6xl mb-4">
                <AnimatedEmoji emoji="🧘" size="2xl" animation="float" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Rate Your Session</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-6">How peaceful was your meditation?</p>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-400'
                    }`}
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
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
                  className="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleRatingSubmit}
                  disabled={rating === 0}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  Submit Rating
                  <AnimatedEmoji emoji="✨" size="sm" animation="pulse" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};