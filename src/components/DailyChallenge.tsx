import React from 'react';
import { Star, X, Calendar, Award } from 'lucide-react';

interface DailyChallengeProps {
  onStart: () => void;
  onClose: () => void;
  isCompleted: boolean;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onStart, onClose, isCompleted }) => {
  // Get today's date for the challenge
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 w-full max-w-md relative border border-indigo-500/50 shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center justify-center mb-4">
          <Star className="text-yellow-400 mr-2" size={28} />
          <h2 className="text-2xl font-bold">Daily Challenge</h2>
          <Star className="text-yellow-400 ml-2" size={28} />
        </div>
        
        <div className="flex items-center justify-center mb-6 text-indigo-300">
          <Calendar size={18} className="mr-2" />
          <span>{dateString}</span>
        </div>
        
        {isCompleted ? (
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center bg-green-600/20 border border-green-600/40 rounded-full p-3 mb-4">
              <Award size={32} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Challenge Completed!</h3>
            <p className="text-indigo-300 mb-4">
              You've already completed today's challenge. Come back tomorrow for a new one!
            </p>
            
            <div className="bg-white/10 rounded-lg p-4 mb-4">
              <p className="text-sm">Next challenge available in:</p>
              <div className="text-xl font-bold mt-1">
                {23 - today.getHours()}h {59 - today.getMinutes()}m
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <p className="text-lg mb-2">
                Test your celebrity knowledge with today's special challenge!
              </p>
              <p className="text-indigo-300 text-sm mb-4">
                Complete the daily challenge to earn bonus XP and climb the leaderboard faster.
              </p>
              
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <h4 className="font-bold mb-2">Rewards:</h4>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center">
                    <Star size={16} className="text-yellow-400 mr-2" />
                    <span>2x XP Bonus</span>
                  </li>
                  <li className="flex items-center">
                    <Award size={16} className="text-blue-400 mr-2" />
                    <span>Special Badge</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar size={16} className="text-green-400 mr-2" />
                    <span>Daily Streak Bonus</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={onStart}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-bold"
              >
                <Star size={18} />
                Start Daily Challenge
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DailyChallenge;