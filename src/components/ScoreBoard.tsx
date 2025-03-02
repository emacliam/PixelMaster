import React from 'react';
import { Trophy, Star } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  level: number;
  xp: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, level, xp }) => {
  // Define ranks based on score
  const getRank = () => {
    if (score >= 500) return { title: 'Celebrity Expert', color: 'text-yellow-400' };
    if (score >= 300) return { title: 'Star Spotter', color: 'text-blue-400' };
    if (score >= 100) return { title: 'Fame Apprentice', color: 'text-green-400' };
    return { title: 'Novice Fan', color: 'text-gray-400' };
  };

  const rank = getRank();
  
  // Calculate XP progress to next level
  const xpForCurrentLevel = (level - 1) * 100;
  const xpProgress = xp - xpForCurrentLevel;
  const progressPercentage = (xpProgress / 100) * 100;

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-3 flex items-center justify-center">
        <Trophy className="mr-2" size={20} />
        Score Board
      </h3>
      
      <div className="bg-white/5 rounded-lg p-4 mb-4">
        <div className="text-4xl font-bold mb-2">{score}</div>
        <div className={`text-sm font-medium ${rank.color}`}>{rank.title}</div>
        
        {/* Level progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Level {level}</span>
            <span>{xpProgress}/100 XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1 text-indigo-300">
            Next: Level {level + 1}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-white/5 rounded-lg p-2">
          <div className="font-bold text-yellow-400">500+</div>
          <div>Celebrity Expert</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="font-bold text-blue-400">300+</div>
          <div>Star Spotter</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="font-bold text-green-400">100+</div>
          <div>Fame Apprentice</div>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <div className="font-bold text-gray-400">0+</div>
          <div>Novice Fan</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;