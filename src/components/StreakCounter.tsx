import React from 'react';
import { Siren as Fire } from 'lucide-react';

interface StreakCounterProps {
  streak: number;
  bestStreak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak, bestStreak }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-3 flex items-center">
        <Fire className="mr-2" size={20} />
        Streak Counter
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-3 text-center">
          <div className="text-sm mb-1">Current Streak</div>
          <div className="text-2xl font-bold">{streak}</div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3 text-center">
          <div className="text-sm mb-1">Best Streak</div>
          <div className="text-2xl font-bold">{bestStreak}</div>
        </div>
      </div>
      
      {streak >= 3 && (
        <div className="mt-3 bg-amber-600/20 border border-amber-600/40 rounded-lg p-2 text-sm text-center">
          {streak >= 10 ? "Incredible streak! You're on fire! 🔥🔥🔥" :
           streak >= 5 ? "Amazing streak! Keep it going! 🔥🔥" :
           "Nice streak! Keep guessing correctly! 🔥"}
        </div>
      )}
    </div>
  );
};

export default StreakCounter;