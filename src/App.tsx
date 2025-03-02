import React, { useState, useEffect } from 'react';
import { Upload, Award, HelpCircle, RefreshCw, ThumbsUp, ThumbsDown, Clock, Siren as Fire, Star, Trophy, Timer, Zap } from 'lucide-react';
import PixelatedImage from './components/PixelatedImage';
import ScoreBoard from './components/ScoreBoard';
import UploadModal from './components/UploadModal';
import HintSystem from './components/HintSystem';
import StreakCounter from './components/StreakCounter';
import DailyChallenge from './components/DailyChallenge';
import Leaderboard from './components/Leaderboard';

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [actorName, setActorName] = useState<string>('');
  const [guess, setGuess] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [pixelationLevel, setPixelationLevel] = useState<number>(20);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameMode, setGameMode] = useState<'normal' | 'timed' | 'daily'>('normal');
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [xpGained, setXpGained] = useState<number | null>(null);
  const [level, setLevel] = useState<number>(1);
  const [xp, setXp] = useState<number>(0);
  const [showDailyChallenge, setShowDailyChallenge] = useState<boolean>(false);
  const [dailyCompleted, setDailyCompleted] = useState<boolean>(false);
  const [comboMultiplier, setComboMultiplier] = useState<number>(1);
  const [showComboMessage, setShowComboMessage] = useState<boolean>(false);
  const [comboMessage, setComboMessage] = useState<string>('');

  // Sample actors for demo purposes
  const sampleActors = [
    { name: 'Tom Hanks', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Scarlett Johansson', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Denzel Washington', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Meryl Streep', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Leonardo DiCaprio', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Jennifer Lawrence', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Brad Pitt', imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
    { name: 'Emma Stone', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
  ];

  // Sample leaderboard data
  const leaderboardData = [
    { name: 'PixelMaster', score: 1250, level: 15 },
    { name: 'CelebHunter', score: 980, level: 12 },
    { name: 'StarGazer', score: 820, level: 10 },
    { name: 'MovieBuff', score: 750, level: 9 },
    { name: 'HollywoodFan', score: 620, level: 8 },
    { name: 'You', score: score, level: level },
    { name: 'ActorNewbie', score: 320, level: 5 },
    { name: 'PixelRookie', score: 180, level: 3 },
  ];

  // Timer for timed mode
  useEffect(() => {
    let timer: number | undefined;
    
    if (gameMode === 'timed' && timeLeft > 0 && isCorrect === null) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Time's up - mark as incorrect
            setIsCorrect(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameMode, timeLeft, isCorrect]);

  // Load game on start
  useEffect(() => {
    if (!gameStarted && sampleActors.length > 0) {
      const randomIndex = Math.floor(Math.random() * sampleActors.length);
      setImage(sampleActors[randomIndex].imageUrl);
      setActorName(sampleActors[randomIndex].name);
      setGameStarted(true);
      
      // Load saved data from localStorage
      const savedScore = localStorage.getItem('pixelPerfect_score');
      const savedLevel = localStorage.getItem('pixelPerfect_level');
      const savedXp = localStorage.getItem('pixelPerfect_xp');
      const savedBestStreak = localStorage.getItem('pixelPerfect_bestStreak');
      
      if (savedScore) setScore(parseInt(savedScore));
      if (savedLevel) setLevel(parseInt(savedLevel));
      if (savedXp) setXp(parseInt(savedXp));
      if (savedBestStreak) setBestStreak(parseInt(savedBestStreak));
      
      // Check if daily challenge was completed today
      const lastDailyDate = localStorage.getItem('pixelPerfect_lastDaily');
      const today = new Date().toDateString();
      
      if (lastDailyDate === today) {
        setDailyCompleted(true);
      }
    }
  }, [gameStarted, sampleActors]);

  // Save game data when score changes
  useEffect(() => {
    if (score > 0) {
      localStorage.setItem('pixelPerfect_score', score.toString());
      localStorage.setItem('pixelPerfect_level', level.toString());
      localStorage.setItem('pixelPerfect_xp', xp.toString());
      localStorage.setItem('pixelPerfect_bestStreak', bestStreak.toString());
    }
  }, [score, level, xp, bestStreak]);

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(attempts + 1);
    
    // Case insensitive comparison
    const isGuessCorrect = guess.toLowerCase() === actorName.toLowerCase();
    setIsCorrect(isGuessCorrect);
    
    if (isGuessCorrect) {
      // Calculate score based on pixelation level, hints used, and time left (for timed mode)
      const baseScore = 100 - pixelationLevel;
      const hintPenalty = hintsUsed * 15;
      const attemptPenalty = (attempts > 1) ? (attempts - 1) * 10 : 0;
      const timeBonus = gameMode === 'timed' ? timeLeft * 2 : 0;
      
      // Apply combo multiplier
      let newComboMultiplier = comboMultiplier;
      if (attempts === 1 && hintsUsed === 0) {
        // Perfect guess - increase combo
        newComboMultiplier = Math.min(5, comboMultiplier + 0.5);
        
        // Show combo message
        if (newComboMultiplier > 1) {
          const messages = [
            'Perfect Guess! x{combo}',
            'Combo x{combo}! Keep it up!',
            'On Fire! x{combo}',
            'Unstoppable! x{combo}'
          ];
          const randomMessage = messages[Math.floor(Math.random() * messages.length)];
          setComboMessage(randomMessage.replace('{combo}', newComboMultiplier.toString()));
          setShowComboMessage(true);
          setTimeout(() => setShowComboMessage(false), 2000);
        }
      } else {
        // Reset combo if hints were used or multiple attempts
        newComboMultiplier = 1;
      }
      
      setComboMultiplier(newComboMultiplier);
      
      // Calculate final points with combo multiplier
      const newPoints = Math.max(10, Math.floor((baseScore - hintPenalty - attemptPenalty + timeBonus) * newComboMultiplier));
      
      // Update score
      setScore(score + newPoints);
      
      // Update streak
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
      
      // Calculate XP gained
      const xpGained = Math.floor(newPoints * 1.5);
      setXpGained(xpGained);
      
      // Update total XP and level
      const newXp = xp + xpGained;
      setXp(newXp);
      
      // Level up if enough XP (100 XP per level)
      const newLevel = Math.floor(newXp / 100) + 1;
      if (newLevel > level) {
        setLevel(newLevel);
        // Could add level up animation/notification here
      }
      
      // Decrease pixelation (make it harder) for next round
      setPixelationLevel(Math.min(30, pixelationLevel + 5));
      
      // If this was a daily challenge, mark as completed
      if (gameMode === 'daily') {
        setDailyCompleted(true);
        localStorage.setItem('pixelPerfect_lastDaily', new Date().toDateString());
      }
    } else {
      // Incorrect guess
      setStreak(0);
      setComboMultiplier(1);
      
      // Make it easier if they're struggling
      if (attempts >= 3 && pixelationLevel > 10) {
        setPixelationLevel(pixelationLevel - 5);
      }
    }
  };

  const handleNextActor = () => {
    // Reset for next round
    setGuess('');
    setIsCorrect(null);
    setHintsUsed(0);
    setShowHint(false);
    setAttempts(0);
    setXpGained(null);
    
    // Reset timer for timed mode
    if (gameMode === 'timed') {
      setTimeLeft(30);
    }
    
    // Choose a random actor from the sample list
    const randomIndex = Math.floor(Math.random() * sampleActors.length);
    setImage(sampleActors[randomIndex].imageUrl);
    setActorName(sampleActors[randomIndex].name);
    
    // Exit daily challenge mode after completion
    if (gameMode === 'daily' && isCorrect) {
      setGameMode('normal');
    }
  };

  const handleUpload = (uploadedImage: string, name: string) => {
    setImage(uploadedImage);
    setActorName(name);
    setShowUploadModal(false);
    setGuess('');
    setIsCorrect(null);
    setHintsUsed(0);
    setShowHint(false);
    setAttempts(0);
    setXpGained(null);
    
    // Reset timer for timed mode
    if (gameMode === 'timed') {
      setTimeLeft(30);
    }
  };

  const useHint = () => {
    setHintsUsed(hintsUsed + 1);
    setShowHint(true);
    // Using a hint breaks the combo
    setComboMultiplier(1);
  };

  const generateHint = () => {
    const hints = [
      `First letter: ${actorName.charAt(0)}`,
      `Number of letters: ${actorName.length}`,
      `Famous for: ${actorName === 'Tom Hanks' ? 'Forrest Gump' : 
                     actorName === 'Scarlett Johansson' ? 'Black Widow' : 
                     actorName === 'Denzel Washington' ? 'Training Day' : 
                     actorName === 'Meryl Streep' ? 'The Devil Wears Prada' : 
                     actorName === 'Leonardo DiCaprio' ? 'Titanic' :
                     actorName === 'Jennifer Lawrence' ? 'The Hunger Games' :
                     actorName === 'Brad Pitt' ? 'Fight Club' :
                     actorName === 'Emma Stone' ? 'La La Land' :
                     'Many popular movies'}`
    ];
    
    return hints[Math.min(hintsUsed - 1, hints.length - 1)];
  };

  const startTimedMode = () => {
    setGameMode('timed');
    setTimeLeft(30);
    handleNextActor();
  };

  const startDailyChallenge = () => {
    setGameMode('daily');
    setShowDailyChallenge(false);
    
    // Set a specific actor for the daily challenge (would normally be server-controlled)
    const dailyActor = sampleActors[new Date().getDate() % sampleActors.length];
    setImage(dailyActor.imageUrl);
    setActorName(dailyActor.name);
    
    // Reset game state
    setGuess('');
    setIsCorrect(null);
    setHintsUsed(0);
    setShowHint(false);
    setAttempts(0);
    setXpGained(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8 relative">
          <h1 className="text-4xl font-bold mb-2">Pixel Perfect</h1>
          <p className="text-xl">Guess the actor behind the pixels!</p>
          
          {/* Game mode indicator */}
          {gameMode !== 'normal' && (
            <div className="absolute top-0 right-4 bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              {gameMode === 'timed' ? (
                <>
                  <Clock size={16} className="mr-1" />
                  Timed Mode
                </>
              ) : (
                <>
                  <Star size={16} className="mr-1" />
                  Daily Challenge
                </>
              )}
            </div>
          )}
          
          {/* Level indicator */}
          <div className="absolute top-0 left-4 bg-gradient-to-r from-amber-500 to-amber-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Trophy size={16} className="mr-1" />
            Level {level}
          </div>
        </header>

        {/* Game modes selection */}
        <div className="flex justify-center gap-4 mb-6">
          <button 
            onClick={() => setGameMode('normal')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              gameMode === 'normal' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800'
            }`}
          >
            <Trophy size={18} />
            Classic Mode
          </button>
          
          <button 
            onClick={startTimedMode}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              gameMode === 'timed' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800'
            }`}
          >
            <Timer size={18} />
            Timed Mode
          </button>
          
          <button 
            onClick={() => setShowDailyChallenge(true)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              gameMode === 'daily' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800'
            }`}
            disabled={dailyCompleted}
          >
            <Star size={18} />
            Daily Challenge
            {dailyCompleted && <span className="ml-1 text-xs">(Completed)</span>}
          </button>
          
          <button 
            onClick={() => setShowLeaderboard(true)}
            className="px-4 py-2 rounded-lg flex items-center gap-2 bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800 transition-colors"
          >
            <Award size={18} />
            Leaderboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            {image ? (
              <div className="flex flex-col items-center">
                {/* Combo message animation */}
                {showComboMessage && (
                  <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animate-bounce">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-lg text-xl font-bold">
                      {comboMessage}
                    </div>
                  </div>
                )}
                
                <div className="relative w-full max-w-md mb-6">
                  <PixelatedImage src={image} pixelationLevel={pixelationLevel} />
                  
                  {/* Difficulty indicator */}
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    Pixelation: {pixelationLevel}
                  </div>
                  
                  {/* Timer for timed mode */}
                  {gameMode === 'timed' && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-bold flex items-center ${
                      timeLeft <= 10 ? 'bg-red-600 animate-pulse' : 'bg-indigo-600'
                    }`}>
                      <Clock size={16} className="mr-1" />
                      {timeLeft}s
                    </div>
                  )}
                  
                  {/* Streak counter */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Fire size={16} className="mr-1" />
                    Streak: {streak}
                  </div>
                  
                  {/* Combo multiplier */}
                  {comboMultiplier > 1 && (
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500 to-pink-600 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                      <Zap size={16} className="mr-1" />
                      {comboMultiplier}x
                    </div>
                  )}
                </div>
                
                {isCorrect === null ? (
                  <form onSubmit={handleGuessSubmit} className="w-full max-w-md">
                    <div className="flex mb-4">
                      <input
                        type="text"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="Who is this actor?"
                        className="flex-grow px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
                        required
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-r-lg transition-colors"
                      >
                        Guess
                      </button>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={useHint}
                        className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                        disabled={hintsUsed >= 3}
                      >
                        <HelpCircle size={18} />
                        {hintsUsed < 3 ? 'Use Hint' : 'No More Hints'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <Upload size={18} />
                        Upload Actor
                      </button>
                    </div>
                    
                    {showHint && (
                      <div className="mt-4 p-3 bg-amber-600/20 border border-amber-600/40 rounded-lg">
                        <p><strong>Hint:</strong> {generateHint()}</p>
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="text-center w-full max-w-md">
                    {isCorrect ? (
                      <div className="bg-green-600/20 border border-green-600/40 p-4 rounded-lg mb-4 flex items-center">
                        <ThumbsUp className="mr-2" size={24} />
                        <div>
                          <p className="font-bold text-xl">Correct!</p>
                          <p>That is indeed {actorName}.</p>
                          
                          {/* XP gained animation */}
                          {xpGained && (
                            <div className="mt-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-2 py-1 rounded text-sm inline-flex items-center">
                              <Star size={14} className="mr-1" />
                              +{xpGained} XP
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-600/20 border border-red-600/40 p-4 rounded-lg mb-4 flex items-center">
                        <ThumbsDown className="mr-2" size={24} />
                        <div>
                          <p className="font-bold text-xl">Not quite!</p>
                          <p>The actor was {actorName}.</p>
                          {gameMode === 'timed' && timeLeft === 0 && (
                            <p className="text-sm mt-1">Time's up!</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={handleNextActor}
                      className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-colors"
                    >
                      <RefreshCw size={18} />
                      Next Actor
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-xl mb-4">No image loaded</p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Upload size={18} />
                  Upload Actor
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl">
            <ScoreBoard score={score} level={level} xp={xp} />
            
            <StreakCounter streak={streak} bestStreak={bestStreak} />
            
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                <Award className="mr-2" size={20} />
                Game Stats
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className="font-medium">
                    {pixelationLevel <= 10 ? 'Easy' : pixelationLevel <= 20 ? 'Medium' : 'Hard'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Attempts:</span>
                  <span className="font-medium">{attempts}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hints Used:</span>
                  <span className="font-medium">{hintsUsed}/3</span>
                </div>
                <div className="flex justify-between">
                  <span>Combo Multiplier:</span>
                  <span className="font-medium">{comboMultiplier}x</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-3">How to Play</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Look at the pixelated image of an actor</li>
                  <li>Type your guess in the input field</li>
                  <li>Use hints if you're stuck (costs points)</li>
                  <li>Build combos with perfect guesses</li>
                  <li>Complete daily challenges for bonus XP</li>
                  <li>Try timed mode for extra challenge</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} onUpload={handleUpload} />
      )}
      
      {showLeaderboard && (
        <Leaderboard 
          data={leaderboardData} 
          onClose={() => setShowLeaderboard(false)}
          yourScore={score}
          yourLevel={level}
        />
      )}
      
      {showDailyChallenge && (
        <DailyChallenge 
          onStart={startDailyChallenge}
          onClose={() => setShowDailyChallenge(false)}
          isCompleted={dailyCompleted}
        />
      )}
    </div>
  );
}

export default App;