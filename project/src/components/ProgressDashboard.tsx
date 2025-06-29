import React from 'react';
import { Calendar, TrendingUp, Clock, Award, Heart } from 'lucide-react';
import { WellnessSession } from '../types';

interface ProgressDashboardProps {
  sessions: WellnessSession[];
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ sessions }) => {
  const today = new Date().toDateString();
  const thisWeek = sessions.filter(session => {
    const sessionDate = new Date(session.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return sessionDate >= weekAgo;
  });

  const todaySessions = sessions.filter(session => 
    new Date(session.timestamp).toDateString() === today
  );

  const totalMinutes = sessions.reduce((total, session) => total + (session.duration / 60), 0);
  const averageRating = sessions.length > 0 
    ? sessions.filter(s => s.rating).reduce((sum, s) => sum + (s.rating || 0), 0) / sessions.filter(s => s.rating).length
    : 0;

  const weeklyStats = {
    music: thisWeek.filter(s => s.type === 'music').length,
    breathing: thisWeek.filter(s => s.type === 'breathing').length,
    meditation: thisWeek.filter(s => s.type === 'meditation').length,
  };

  const streak = calculateStreak(sessions);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your Wellness Journey</h2>
        <p className="text-gray-600">Track your progress and celebrate your achievements</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-blue-800 mb-1">{Math.round(totalMinutes)}</div>
          <div className="text-sm text-blue-600">Total Minutes</div>
        </div>

        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-green-800 mb-1">{streak}</div>
          <div className="text-sm text-green-600">Day Streak</div>
        </div>

        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-purple-800 mb-1">{sessions.length}</div>
          <div className="text-sm text-purple-600">Total Sessions</div>
        </div>

        <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6 text-center">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-pink-800 mb-1">{averageRating.toFixed(1)}</div>
          <div className="text-sm text-pink-600">Avg. Rating</div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          This Week's Activity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-indigo-800">Music Therapy</h4>
                <p className="text-indigo-600 text-sm">Relaxation sessions</p>
              </div>
              <div className="text-2xl font-bold text-indigo-800">{weeklyStats.music}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4 border border-teal-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-teal-800">Breathing</h4>
                <p className="text-teal-600 text-sm">Mindful exercises</p>
              </div>
              <div className="text-2xl font-bold text-teal-800">{weeklyStats.breathing}</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-purple-800">Meditation</h4>
                <p className="text-purple-600 text-sm">Peaceful moments</p>
              </div>
              <div className="text-2xl font-bold text-purple-800">{weeklyStats.meditation}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Progress</h3>
        {todaySessions.length > 0 ? (
          <div className="space-y-3">
            {todaySessions.map((session, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    session.type === 'music' ? 'bg-indigo-500' :
                    session.type === 'breathing' ? 'bg-teal-500' : 'bg-purple-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-800 capitalize">{session.type}</h4>
                    <p className="text-sm text-gray-600">
                      {Math.round(session.duration / 60)} minutes • {session.mood}
                    </p>
                  </div>
                </div>
                {session.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className={`w-4 h-4 ${
                          i < session.rating! ? 'text-pink-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No sessions today yet. Start your wellness journey!</p>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {getAchievements(sessions).map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl text-center transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300'
                  : 'bg-gray-100 border-2 border-gray-200 opacity-60'
              }`}
            >
              <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                {achievement.emoji}
              </div>
              <h4 className={`font-semibold text-sm mb-1 ${
                achievement.unlocked ? 'text-yellow-800' : 'text-gray-600'
              }`}>
                {achievement.title}
              </h4>
              <p className={`text-xs ${
                achievement.unlocked ? 'text-yellow-600' : 'text-gray-500'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function calculateStreak(sessions: WellnessSession[]): number {
  if (sessions.length === 0) return 0;
  
  const today = new Date();
  const sortedSessions = sessions.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  let streak = 0;
  let currentDate = new Date(today);
  
  for (let i = 0; i < 30; i++) { // Check last 30 days
    const daySessions = sortedSessions.filter(session => 
      new Date(session.timestamp).toDateString() === currentDate.toDateString()
    );
    
    if (daySessions.length > 0) {
      streak++;
    } else if (streak > 0) {
      break;
    }
    
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
}

function getAchievements(sessions: WellnessSession[]) {
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((total, session) => total + (session.duration / 60), 0);
  const streak = calculateStreak(sessions);
  
  return [
    {
      title: 'First Steps',
      description: 'Complete first session',
      emoji: '🌱',
      unlocked: totalSessions >= 1
    },
    {
      title: 'Consistent',
      description: '7-day streak',
      emoji: '🔥',
      unlocked: streak >= 7
    },
    {
      title: 'Dedicated',
      description: '30 total sessions',
      emoji: '💪',
      unlocked: totalSessions >= 30
    },
    {
      title: 'Zen Master',
      description: '10 hours practiced',
      emoji: '🧘',
      unlocked: totalMinutes >= 600
    }
  ];
}