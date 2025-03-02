import React from 'react';
import { X, Trophy, Medal, Award, User } from 'lucide-react';

interface LeaderboardProps {
  data: Array<{
    name: string;
    score: number;
    level: number;
  }>;
  onClose: () => void;
  yourScore: number;
  yourLevel: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data, onClose, yourScore, yourLevel }) => {
  // Sort data by score (highest first)
  const sortedData = [...data].sort((a, b) => b.score - a.score);
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl p-6 w-full max-w-md relative border border-indigo-500/50 shadow-xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <div className="flex items-center justify-center mb-6">
          <Trophy className="text-yellow-400 mr-2" size={28} />
          <h2 className="text-2xl font-bold">Leaderboard</h2>
        </div>
        
        <div className="mb-6">
          <div className="grid grid-cols-12 text-sm font-medium text-indigo-300 mb-2 px-2">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Player</div>
            <div className="col-span-3 text-right">Score</div>
            <div className="col-span-2 text-right">Level</div>
          </div>
          
          <div className="space-y-2">
            {sortedData.map((player, index) => {
              const isYou = player.name === 'You';
              const rank = index + 1;
              
              // Update "You" entry with current score
              const displayScore = isYou ? yourScore : player.score;
              const displayLevel = isYou ? yourLevel : player.level;
              
              return (
                <div 
                  key={index}
                  className={`grid grid-cols-12 items-center p-2 rounded-lg ${
                    isYou 
                      ? 'bg-indigo-600/40 border border-indigo-500' 
                      : rank <= 3 
                        ? 'bg-white/10' 
                        : 'bg-white/5'
                  }`}
                >
                  <div className="col-span-1">
                    {rank === 1 ? (
                      <Trophy size={18} className="text-yellow-400" />
                    ) : rank === 2 ? (
                      <Medal size={18} className="text-gray-300" />
                    ) : rank === 3 ? (
                      <Medal size={18} className="text-amber-700" />
                    ) : (
                      <span className="text-sm">{rank}</span>
                    )}
                  </div>
                  
                  <div className="col-span-6 flex items-center">
                    {isYou ? (
                      <User size={18} className="mr-2 text-indigo-300" />
                    ) : (
                      <Award size={18} className="mr-2 text-indigo-300" />
                    )}
                    <span className={isYou ? 'font-bold' : ''}>{player.name}</span>
                  </div>
                  
                  <div className="col-span-3 text-right font-medium">
                    {displayScore.toLocaleString()}
                  </div>
                  
                  <div className="col-span-2 text-right">
                    <span className="bg-indigo-800/50 px-2 py-1 rounded text-xs">
                      Lv.{displayLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center text-sm text-indigo-300">
          Keep playing to climb the leaderboard!
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;