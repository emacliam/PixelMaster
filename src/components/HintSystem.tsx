import React from 'react';
import { HelpCircle, AlertTriangle } from 'lucide-react';

interface HintSystemProps {
  actorName: string;
  hintsUsed: number;
  onUseHint: () => void;
}

const HintSystem: React.FC<HintSystemProps> = ({ actorName, hintsUsed, onUseHint }) => {
  const generateHint = () => {
    // First hint: First letter
    if (hintsUsed === 1) {
      return `The actor's name starts with "${actorName.charAt(0)}"`;
    }
    
    // Second hint: Number of letters in name
    if (hintsUsed === 2) {
      return `The actor's name has ${actorName.length} letters`;
    }
    
    // Third hint: Famous movie or role
    if (hintsUsed === 3) {
      // This would be better with a real database of actors and their famous roles
      const famousRoles: Record<string, string> = {
        'Tom Hanks': 'Forrest Gump',
        'Scarlett Johansson': 'Black Widow',
        'Denzel Washington': 'Training Day',
        'Meryl Streep': 'The Devil Wears Prada',
      };
      
      return `This actor is famous for their role in "${famousRoles[actorName] || 'many popular movies'}"`;
    }
    
    return 'No more hints available';
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium flex items-center">
          <HelpCircle size={18} className="mr-1" />
          Hint System
        </h3>
        <span className="text-sm">{hintsUsed}/3 used</span>
      </div>
      
      {hintsUsed > 0 && (
        <div className="p-3 bg-amber-600/20 border border-amber-600/40 rounded-lg mb-3">
          <p>{generateHint()}</p>
        </div>
      )}
      
      {hintsUsed < 3 ? (
        <button
          onClick={onUseHint}
          className="w-full bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <HelpCircle size={16} />
          Use a Hint
        </button>
      ) : (
        <div className="p-2 bg-gray-700 rounded-lg text-sm flex items-center">
          <AlertTriangle size={16} className="mr-2 text-amber-500" />
          No more hints available
        </div>
      )}
      
      <p className="text-xs text-gray-400 mt-2">
        Note: Using hints will reduce your potential score for this round
      </p>
    </div>
  );
};

export default HintSystem;