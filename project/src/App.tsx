import React, { useState, useEffect } from 'react';
import { Brain, Music, Wind, Timer, BarChart3, Phone, LogIn, LogOut, User, Moon, Sun, Sparkles, Gamepad2, Users } from 'lucide-react';
import { Mood } from './types';
import { MoodSelector } from './components/MoodSelector';
import { MusicTherapy } from './components/MusicTherapy';
import { BreathingExercise } from './components/BreathingExercise';
import { MeditationTimer } from './components/MeditationTimer';
import { ProgressDashboard } from './components/ProgressDashboard';
import { SatisfactionGame } from './components/SatisfactionGame';
import { TeamPage } from './components/TeamPage';
import { AuthModal } from './components/Auth/AuthModal';
import { AnimatedEmoji } from './components/AnimatedEmoji';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { useWellnessSessions } from './hooks/useWellnessSessions';

type ViewType = 'mood' | 'music' | 'breathing' | 'meditation' | 'progress' | 'game' | 'team';

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>('mood');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const { user, signOut, loading: authLoading } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { sessions, addSession } = useWellnessSessions();

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setTimeout(() => {
      setCurrentView('music');
    }, 500);
  };

  const handleSessionComplete = (type: 'music' | 'breathing' | 'meditation', duration: number, rating?: number) => {
    if (selectedMood) {
      addSession(type, selectedMood.id, duration, rating);
    }
  };

  const handleGameComplete = (duration: number, score: number) => {
    if (selectedMood) {
      // Convert score to a 1-5 rating scale
      const rating = Math.min(5, Math.max(1, Math.ceil(score / 100)));
      addSession('meditation', selectedMood.id, duration, rating);
    }
  };

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const navigationItems = [
    { id: 'mood' as ViewType, label: 'Mood Check', icon: Brain, color: 'from-blue-500 to-indigo-500', darkColor: 'from-blue-400 to-indigo-400', emoji: '🧠' },
    { id: 'music' as ViewType, label: 'Music Therapy', icon: Music, color: 'from-purple-500 to-pink-500', darkColor: 'from-purple-400 to-pink-400', emoji: '🎵' },
    { id: 'breathing' as ViewType, label: 'Breathing', icon: Wind, color: 'from-teal-500 to-green-500', darkColor: 'from-teal-400 to-green-400', emoji: '🌬️' },
    { id: 'meditation' as ViewType, label: 'Meditation', icon: Timer, color: 'from-indigo-500 to-purple-500', darkColor: 'from-indigo-400 to-purple-400', emoji: '🧘' },
    { id: 'game' as ViewType, label: 'Mind Game', icon: Gamepad2, color: 'from-pink-500 to-rose-500', darkColor: 'from-pink-400 to-rose-400', emoji: '🎯' },
    { id: 'progress' as ViewType, label: 'Progress', icon: BarChart3, color: 'from-green-500 to-teal-500', darkColor: 'from-green-400 to-teal-400', emoji: '📊' }
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center transition-all duration-500">
        <div className="text-center animate-fade-in">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <AnimatedEmoji emoji="🧠" size="lg" animation="bounce" />
            </div>
            <div className="absolute -top-2 -right-2">
              <AnimatedEmoji emoji="✨" size="sm" animation="pulse" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg font-medium animate-fade-in-up flex items-center justify-center gap-2">
            <AnimatedEmoji emoji="🌟" size="sm" animation="float" />
            Loading your wellness companion...
            <AnimatedEmoji emoji="💫" size="sm" animation="float" />
          </p>
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Show team page if selected
  if (currentView === 'team') {
    return <TeamPage onBack={() => setCurrentView('mood')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-all duration-500">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/20 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 animate-slide-in-left">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <AnimatedEmoji emoji="🧠" size="md" animation="pulse" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <AnimatedEmoji emoji="✨" size="sm" animation="pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  MindfulAI
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <AnimatedEmoji emoji="🌟" size="sm" animation="pulse" />
                  Your Wellness Companion
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 animate-slide-in-right">
              {/* Our Team Button */}
              <button
                onClick={() => setCurrentView('team')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50 hover:from-emerald-200 hover:to-teal-200 dark:hover:from-emerald-800/50 dark:hover:to-teal-800/50 text-emerald-700 dark:text-emerald-300 rounded-2xl transition-all duration-300 hover:scale-105 group border border-emerald-200 dark:border-emerald-700"
              >
                <Users className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                <span className="text-sm font-medium">Our Team</span>
                <AnimatedEmoji emoji="👥" size="sm" animation="bounce" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 group"
              >
                {isDark ? (
                  <AnimatedEmoji emoji="☀️" size="sm" animation="spin" className="group-hover:animate-spin" />
                ) : (
                  <AnimatedEmoji emoji="🌙" size="sm" animation="float" className="group-hover:animate-wiggle" />
                )}
              </button>

              {/* User Authentication */}
              {user ? (
                <div className="flex items-center gap-3 animate-fade-in">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 rounded-2xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <AnimatedEmoji emoji="👤" size="sm" animation="bounce" />
                    </div>
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 animate-fade-in">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 hover:bg-blue-200 dark:hover:bg-blue-800/50 text-blue-700 dark:text-blue-200 rounded-2xl transition-all duration-300 hover:scale-105 group"
                  >
                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    <span className="text-sm font-medium">Sign In</span>
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  >
                    <User className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="text-sm font-medium">Sign Up</span>
                  </button>
                </div>
              )}

              {/* Emergency Support */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/50 dark:to-pink-900/50 hover:from-red-200 hover:to-pink-200 dark:hover:from-red-800/50 dark:hover:to-pink-800/50 text-red-700 dark:text-red-300 rounded-2xl transition-all duration-300 hover:scale-105 group">
                <AnimatedEmoji emoji="🆘" size="sm" animation="pulse" className="group-hover:animate-heartbeat" />
                <span className="text-sm font-medium">Crisis Support</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/20 sticky top-24 animate-slide-in-left">
              <div className="space-y-3">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  const isDisabled = item.id !== 'mood' && item.id !== 'progress' && item.id !== 'game' && !selectedMood;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => !isDisabled && setCurrentView(item.id)}
                      disabled={isDisabled}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
                        ${isActive 
                          ? `bg-gradient-to-r ${isDark ? item.darkColor : item.color} text-white shadow-xl transform scale-105 animate-glow` 
                          : isDisabled
                            ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed opacity-50'
                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102 hover:shadow-lg'
                        }
                      `}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center gap-2">
                        <AnimatedEmoji 
                          emoji={item.emoji} 
                          size="sm" 
                          animation={isActive ? 'dance' : 'float'}
                          className={`transition-transform duration-300 ${isActive ? '' : 'group-hover:scale-110'}`}
                        />
                        <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'animate-pulse' : 'group-hover:scale-110'}`} />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {isDisabled && item.id !== 'mood' && item.id !== 'game' && (
                        <div className="ml-auto w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Mood Status */}
              {selectedMood && (
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl animate-fade-in-up border border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <AnimatedEmoji emoji="✨" size="sm" animation="pulse" />
                    Current Mood
                  </p>
                  <div className="flex items-center gap-3">
                    <AnimatedEmoji emoji={selectedMood.emoji} size="lg" animation="dance" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100">{selectedMood.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{selectedMood.description}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* User Status */}
              {user && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border border-blue-200 dark:border-blue-700 animate-fade-in-up">
                  <p className="text-sm text-blue-600 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Account Status
                    <AnimatedEmoji emoji="🔒" size="sm" animation="pulse" />
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Synced & Secure</p>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
                    <AnimatedEmoji emoji="📊" size="sm" animation="bounce" />
                    {sessions.length} sessions tracked
                  </p>
                </div>
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-h-[600px] animate-fade-in">
            {currentView === 'mood' && (
              <MoodSelector 
                selectedMood={selectedMood} 
                onMoodSelect={handleMoodSelect} 
              />
            )}
            
            {currentView === 'music' && selectedMood && (
              <MusicTherapy 
                selectedMood={selectedMood}
                onSessionComplete={(duration, rating) => handleSessionComplete('music', duration, rating)}
              />
            )}
            
            {currentView === 'breathing' && (
              <BreathingExercise 
                onSessionComplete={(duration, rating) => handleSessionComplete('breathing', duration, rating)}
              />
            )}
            
            {currentView === 'meditation' && (
              <MeditationTimer 
                onSessionComplete={(duration, rating) => handleSessionComplete('meditation', duration, rating)}
              />
            )}

            {currentView === 'game' && (
              <SatisfactionGame 
                onSessionComplete={handleGameComplete}
              />
            )}
            
            {currentView === 'progress' && (
              <ProgressDashboard sessions={sessions} />
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Hints */}
      {!selectedMood && currentView !== 'mood' && currentView !== 'progress' && currentView !== 'game' && (
        <div className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-3xl shadow-2xl animate-bounce-gentle border border-white/20">
          <p className="text-sm font-medium flex items-center gap-2">
            <AnimatedEmoji emoji="🧠" size="sm" animation="pulse" />
            Select your mood first!
            <AnimatedEmoji emoji="💙" size="sm" animation="heartbeat" />
          </p>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;