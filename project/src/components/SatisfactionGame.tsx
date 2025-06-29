import React, { useState, useEffect } from 'react';
import { Star, Heart, Sparkles, Trophy, RotateCcw, Play, Pause, CheckCircle } from 'lucide-react';
import { AnimatedEmoji } from './AnimatedEmoji';
import { FloatingEmojis } from './FloatingEmojis';

interface GameSession {
  score: number;
  level: number;
  timeSpent: number;
  completed: boolean;
}

interface SatisfactionGameProps {
  onSessionComplete?: (duration: number, score: number) => void;
}

const mindfulnessActivities = [
  {
    id: 'gratitude',
    title: 'Gratitude Garden',
    description: 'Plant seeds of gratitude by thinking of things you appreciate',
    emoji: '🌱',
    color: 'from-green-400 to-emerald-500',
    darkColor: 'from-green-300 to-emerald-400',
    prompts: [
      'Something that made you smile today',
      'A person who supports you',
      'A place that brings you peace',
      'A skill or talent you have',
      'A memory that warms your heart'
    ]
  },
  {
    id: 'mindful-breathing',
    title: 'Breath Bubbles',
    description: 'Pop bubbles with mindful breathing patterns',
    emoji: '🫧',
    color: 'from-blue-400 to-cyan-500',
    darkColor: 'from-blue-300 to-cyan-400',
    prompts: [
      'Breathe in for 4 counts',
      'Hold for 4 counts',
      'Breathe out for 6 counts',
      'Notice the pause between breaths',
      'Feel your body relax'
    ]
  },
  {
    id: 'positive-affirmations',
    title: 'Affirmation Stars',
    description: 'Collect stars by affirming positive thoughts',
    emoji: '⭐',
    color: 'from-yellow-400 to-orange-500',
    darkColor: 'from-yellow-300 to-orange-400',
    prompts: [
      'I am worthy of love and respect',
      'I choose peace over worry',
      'I am growing stronger every day',
      'I trust in my ability to overcome challenges',
      'I deserve happiness and joy'
    ]
  },
  {
    id: 'sensory-awareness',
    title: 'Mindful Senses',
    description: 'Engage your senses to stay present',
    emoji: '👁️',
    color: 'from-purple-400 to-pink-500',
    darkColor: 'from-purple-300 to-pink-400',
    prompts: [
      'Name 5 things you can see',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste'
    ]
  }
];

export const SatisfactionGame: React.FC<SatisfactionGameProps> = ({ onSessionComplete }) => {
  const [selectedActivity, setSelectedActivity] = useState(mindfulnessActivities[0]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [completedPrompts, setCompletedPrompts] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);

  const backgroundEmojis = ['✨', '🌟', '💫', '🎯', '🎪', '🎨', '🎭', '🎪'];

  useEffect(() => {
    if (completedPrompts.size === selectedActivity.prompts.length && isPlaying) {
      handleLevelComplete();
    }
  }, [completedPrompts, selectedActivity.prompts.length, isPlaying]);

  const startGame = () => {
    setIsPlaying(true);
    setSessionStartTime(new Date());
    setScore(0);
    setLevel(1);
    setCurrentPromptIndex(0);
    setCompletedPrompts(new Set());
    setShowCelebration(false);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setScore(0);
    setLevel(1);
    setCurrentPromptIndex(0);
    setCompletedPrompts(new Set());
    setShowCelebration(false);
    setSessionStartTime(null);
    setGameSession(null);
  };

  const handlePromptComplete = () => {
    if (!isPlaying) return;

    const newCompletedPrompts = new Set(completedPrompts);
    newCompletedPrompts.add(currentPromptIndex);
    setCompletedPrompts(newCompletedPrompts);
    
    const points = 10 + (level * 5);
    setScore(prev => prev + points);
    
    // Move to next prompt
    if (currentPromptIndex < selectedActivity.prompts.length - 1) {
      setCurrentPromptIndex(prev => prev + 1);
    }
  };

  const handleLevelComplete = () => {
    setShowCelebration(true);
    setLevel(prev => prev + 1);
    
    setTimeout(() => {
      if (level >= 3) {
        // Game complete
        endGame();
      } else {
        // Next level
        setCurrentPromptIndex(0);
        setCompletedPrompts(new Set());
        setShowCelebration(false);
      }
    }, 3000);
  };

  const endGame = () => {
    setIsPlaying(false);
    
    if (sessionStartTime) {
      const duration = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000);
      const session: GameSession = {
        score,
        level,
        timeSpent: duration,
        completed: true
      };
      setGameSession(session);
      
      if (onSessionComplete) {
        onSessionComplete(duration, score);
      }
    }
  };

  const switchActivity = (activity: typeof mindfulnessActivities[0]) => {
    if (!isPlaying) {
      setSelectedActivity(activity);
      resetGame();
    }
  };

  const progress = (completedPrompts.size / selectedActivity.prompts.length) * 100;
  const currentPrompt = selectedActivity.prompts[currentPromptIndex];

  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 animate-fade-in overflow-hidden">
      {/* Floating background emojis */}
      <FloatingEmojis emojis={backgroundEmojis} count={10} />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient">
                Satisfaction Mind Game
              </h2>
              <div className="absolute -top-2 -right-2">
                <AnimatedEmoji emoji="🎯" size="md" animation="pulse" />
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg flex items-center justify-center gap-2">
            <AnimatedEmoji emoji="🧠" size="sm" animation="heartbeat" />
            Interactive mindfulness activities for mental wellness
            <AnimatedEmoji emoji="✨" size="sm" animation="float" />
          </p>
        </div>

        {/* Activity Selection */}
        {!isPlaying && !gameSession && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
              <AnimatedEmoji emoji="🎮" size="sm" animation="bounce" />
              Choose Your Mindfulness Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mindfulnessActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  onClick={() => switchActivity(activity)}
                  className={`
                    relative p-6 rounded-2xl cursor-pointer transition-all duration-300 
                    hover:scale-105 hover:shadow-xl group animate-fade-in-up
                    ${selectedActivity.id === activity.id 
                      ? `bg-gradient-to-r ${activity.color} text-white shadow-2xl scale-105` 
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }
                  `}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                      <AnimatedEmoji 
                        emoji={activity.emoji} 
                        size="lg" 
                        animation={selectedActivity.id === activity.id ? 'dance' : 'float'}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold text-lg mb-2 ${
                        selectedActivity.id === activity.id ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {activity.title}
                      </h4>
                      <p className={`text-sm ${
                        selectedActivity.id === activity.id ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {activity.description}
                      </p>
                    </div>
                  </div>
                  
                  {selectedActivity.id === activity.id && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Interface */}
        {isPlaying && (
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Trophy className="w-6 h-6" />
                    {score}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Star className="w-6 h-6" />
                    {level}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {completedPrompts.size}/{selectedActivity.prompts.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                </div>
              </div>
              
              <button
                onClick={pauseGame}
                className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900/50 hover:bg-yellow-200 dark:hover:bg-yellow-800/50 transition-colors group"
              >
                <Pause className="w-5 h-5 text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Activity Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 bg-gradient-to-r ${selectedActivity.color}`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="h-full bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Current Prompt */}
            <div className={`relative p-8 rounded-3xl bg-gradient-to-r ${selectedActivity.color} text-white shadow-2xl animate-scale-in`}>
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce-gentle">
                  <AnimatedEmoji emoji={selectedActivity.emoji} size="2xl" animation="dance" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{selectedActivity.title}</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <p className="text-xl font-medium leading-relaxed">
                    {currentPrompt}
                  </p>
                </div>
                
                {!completedPrompts.has(currentPromptIndex) ? (
                  <button
                    onClick={handlePromptComplete}
                    className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto group"
                  >
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    Complete This Step
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-white/90">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                    <span className="font-semibold">Step Completed!</span>
                    <AnimatedEmoji emoji="🎉" size="md" animation="bounce" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">
                  <AnimatedEmoji emoji="🎉" size="2xl" animation="dance" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Level {level - 1} Complete!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Amazing work! You've completed all mindfulness steps.
                </p>
                <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <Trophy className="w-6 h-6" />
                    +{10 + ((level - 1) * 5)} points
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Game Complete */}
        {gameSession && (
          <div className="text-center space-y-6">
            <div className="text-8xl mb-4 animate-bounce">
              <AnimatedEmoji emoji="🏆" size="2xl" animation="dance" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Mindfulness Master!
            </h3>
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{gameSession.score}</div>
                <div className="text-sm text-purple-600 dark:text-purple-400">Final Score</div>
              </div>
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{gameSession.level}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Levels</div>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 rounded-2xl p-4">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.round(gameSession.timeSpent / 60)}m</div>
                <div className="text-sm text-green-600 dark:text-green-400">Time</div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {!isPlaying && !gameSession && (
            <button
              onClick={startGame}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              Start Mindfulness Game
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
            </button>
          )}
          
          {(isPlaying || gameSession) && (
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              New Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
};