import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { breathingPatterns } from '../utils/moodData';

export const BreathingExercise: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(selectedPattern.inhale);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && currentCycle < selectedPattern.cycles) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              setScale(1.3);
              return selectedPattern.hold || 1;
            } else if (phase === 'hold') {
              setPhase('exhale');
              setScale(0.7);
              return selectedPattern.exhale;
            } else {
              setPhase('inhale');
              setScale(1);
              setCurrentCycle(c => c + 1);
              return selectedPattern.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, phase, currentCycle, selectedPattern]);

  useEffect(() => {
    if (phase === 'inhale') {
      setScale(1.3);
    } else if (phase === 'exhale') {
      setScale(0.7);
    }
  }, [phase]);

  const resetExercise = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(selectedPattern.inhale);
    setCurrentCycle(0);
    setScale(1);
  };

  const toggleExercise = () => {
    if (currentCycle >= selectedPattern.cycles) {
      resetExercise();
    } else {
      setIsActive(!isActive);
    }
  };

  const progress = ((currentCycle * 3 + (phase === 'inhale' ? 0 : phase === 'hold' ? 1 : 2)) / (selectedPattern.cycles * 3)) * 100;
  const isComplete = currentCycle >= selectedPattern.cycles;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Breathing Exercise</h2>
        <p className="text-gray-600">Guided breathing to reduce stress and improve focus</p>
      </div>

      {/* Pattern Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Pattern</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {breathingPatterns.map((pattern) => (
            <div
              key={pattern.id}
              onClick={() => {
                setSelectedPattern(pattern);
                resetExercise();
              }}
              className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedPattern.id === pattern.id
                  ? 'bg-gradient-to-r from-blue-100 to-teal-100 border-2 border-blue-300'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <h4 className={`font-semibold mb-2 ${
                selectedPattern.id === pattern.id ? 'text-blue-800' : 'text-gray-800'
              }`}>
                {pattern.name}
              </h4>
              <p className={`text-sm mb-3 ${
                selectedPattern.id === pattern.id ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {pattern.description}
              </p>
              <div className="text-xs text-gray-500">
                {pattern.inhale}s inhale • {pattern.hold > 0 ? `${pattern.hold}s hold • ` : ''}{pattern.exhale}s exhale
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-8">
          <div 
            className="w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 via-teal-400 to-green-400 shadow-2xl flex items-center justify-center transition-transform duration-1000 ease-in-out"
            style={{ transform: `scale(${scale})` }}
          >
            <div className="text-center text-white">
              <div className="text-6xl font-bold mb-2">{timeLeft}</div>
              <div className="text-lg font-medium uppercase tracking-wider">
                {isComplete ? 'Complete!' : phase}
              </div>
            </div>
          </div>
          
          {/* Breathing Instructions */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-lg font-medium text-gray-700">
              {isComplete 
                ? '🎉 Well done! You completed the exercise.' 
                : isActive 
                  ? phase === 'inhale' 
                    ? 'Breathe in slowly...' 
                    : phase === 'hold' 
                      ? 'Hold your breath...' 
                      : 'Breathe out slowly...'
                  : 'Press play to begin'
              }
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Cycle {Math.min(currentCycle + 1, selectedPattern.cycles)} of {selectedPattern.cycles}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-400 to-teal-400 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={resetExercise}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            onClick={toggleExercise}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 flex items-center gap-3"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {isComplete ? 'Start Over' : 'Start'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};