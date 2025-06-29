import React from 'react';
import { Mood } from '../types';
import { moods } from '../utils/moodData';
import { useTheme } from '../contexts/ThemeContext';
import { Sparkles, Heart } from 'lucide-react';
import { AnimatedEmoji } from './AnimatedEmoji';
import { FloatingEmojis } from './FloatingEmojis';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  const { isDark } = useTheme();

  const backgroundEmojis = ['✨', '🌟', '💫', '🌈', '💖', '🦋', '🌸', '🍀'];

  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 animate-fade-in overflow-hidden">
      {/* Floating background emojis */}
      <FloatingEmojis emojis={backgroundEmojis} count={8} />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                How are you feeling?
              </h2>
              <div className="absolute -top-2 -right-2">
                <AnimatedEmoji emoji="✨" size="md" animation="pulse" />
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center justify-center gap-2">
            <AnimatedEmoji emoji="💖" size="sm" animation="heartbeat" />
            Select your current mood to get personalized support
            <AnimatedEmoji emoji="🌟" size="sm" animation="float" />
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {moods.map((mood, index) => (
            <div
              key={mood.id}
              onClick={() => onMoodSelect(mood)}
              className={`
                relative p-6 rounded-3xl cursor-pointer transition-all duration-500 
                hover:scale-110 hover:shadow-2xl group animate-fade-in-up
                ${selectedMood?.id === mood.id 
                  ? 'ring-4 ring-blue-400 dark:ring-blue-300 shadow-2xl scale-110 animate-glow' 
                  : 'hover:shadow-xl'
                }
              `}
              style={{
                background: `linear-gradient(135deg, ${mood.color.replace('from-', '').replace('to-', ', ')})`,
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Animated background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative text-center">
                <div className="mb-3 group-hover:scale-125 transition-transform duration-300" 
                     style={{ animationDelay: `${index * 200}ms` }}>
                  <AnimatedEmoji 
                    emoji={mood.emoji} 
                    size="xl" 
                    animation={selectedMood?.id === mood.id ? 'dance' : 'float'}
                    className="group-hover:animate-wiggle"
                  />
                </div>
                <h3 className="text-white font-bold text-sm mb-2 drop-shadow-lg group-hover:text-yellow-100 transition-colors duration-300">
                  {mood.name}
                </h3>
                <p className="text-white/90 text-xs leading-tight drop-shadow-sm group-hover:text-white transition-colors duration-300">
                  {mood.description}
                </p>
              </div>
              
              {/* Selection indicator */}
              {selectedMood?.id === mood.id && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-2 right-2 w-1 h-1 bg-white/60 rounded-full animate-ping" style={{ animationDelay: `${index * 300}ms` }}></div>
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: `${index * 400}ms` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Inspirational message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm italic animate-fade-in-up flex items-center justify-center gap-2" style={{ animationDelay: '800ms' }}>
            <AnimatedEmoji emoji="🌟" size="sm" animation="pulse" />
            "Every feeling is valid. Let's find the perfect support for your current state of mind."
            <AnimatedEmoji emoji="✨" size="sm" animation="pulse" />
          </p>
        </div>
      </div>
    </div>
  );
};