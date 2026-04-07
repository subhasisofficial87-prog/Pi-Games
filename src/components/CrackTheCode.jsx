import { useState, useEffect } from 'react';
import { saveScore } from '../gameLogic';
import Confetti from './Confetti';

export default function CrackTheCode({ difficulty, onBack }) {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(5); // Harder: only 5 attempts
  const [timer, setTimer] = useState(45); // Shorter timer: 45 seconds
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);

  // Initialize game
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 50) + 1; // Smaller range: 1-50
    setSecretNumber(randomNum);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameState('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState]);

  const handleGuess = () => {
    if (!guess || gameState !== 'playing') return;

    const numGuess = parseInt(guess);

    if (isNaN(numGuess) || numGuess < 1 || numGuess > 50) {
      setFeedback({ type: 'error', message: '❌ Enter a number between 1 and 50' });
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuess('');

    if (numGuess === secretNumber) {
      setGameState('won');
      setShowConfetti(true);
      saveScore('crack', 'hard', newAttempts, 45 - timer);
    } else {
      // No hints in Crack the Code mode!
      setFeedback({
        type: 'wrong',
        message: `❌ Wrong! ${maxAttempts - newAttempts} attempt${maxAttempts - newAttempts !== 1 ? 's' : ''} left`
      });
      setGuessHistory([...guessHistory, numGuess]);

      if (newAttempts >= maxAttempts) {
        setGameState('lost');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const timerColor = timer > 20 ? 'text-neon-cyan' : timer > 10 ? 'text-yellow-400' : 'text-red-500';
  const timerShake = timer < 10 ? 'animate-pulse' : '';

  return (
    <div className="relative min-h-screen bg-dark-bg text-white flex flex-col">
      {showConfetti && <Confetti />}

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-neon-pink/20">
        <button
          onClick={onBack}
          className="p-2 hover:bg-neon-pink/10 rounded-lg transition-all"
          title="Back to menu"
        >
          🏠
        </button>

        <div className={`text-lg font-bold ${timerColor} ${timerShake}`}>
          ⏱️ {timer}s
        </div>

        <div className="text-lg font-bold text-neon-pink">
          {maxAttempts - attempts} / {maxAttempts} Attempts
        </div>

        <button
          onClick={() => window.location.reload()}
          className="p-2 hover:bg-neon-pink/10 rounded-lg transition-all"
          title="Reload"
        >
          ↻
        </button>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {gameState === 'playing' && (
          <>
            {/* Challenge Message */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-neon-pink mb-4">🔒 Crack the Code</h3>
              <p className="text-gray-400 mb-4">I'm thinking of a number between 1 and 50</p>
              <p className="text-sm text-red-400">⚠️ No hints! Guess carefully!</p>
            </div>

            {/* Input Section */}
            <div className="w-full max-w-2xl mb-8">
              <div className="flex gap-3 mb-6">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Guess a number..."
                  className="flex-1 px-6 py-4 bg-dark-bg border-2 border-neon-pink rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink"
                  disabled={gameState !== 'playing'}
                />
                <button
                  onClick={handleGuess}
                  className="neon-button neon-button-pink px-8 py-4 rounded-lg font-bold"
                  disabled={gameState !== 'playing'}
                >
                  Guess!
                </button>
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  className={`text-center text-lg font-bold py-3 px-4 rounded-lg animate-bounce ${
                    feedback.type === 'error'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-neon-pink/20 text-neon-pink'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>

            {/* Guess History */}
            {guessHistory.length > 0 && (
              <div className="w-full max-w-2xl">
                <p className="text-gray-400 mb-3 text-sm">Previous guesses:</p>
                <div className="flex flex-wrap gap-2">
                  {guessHistory.map((g, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 bg-neon-pink/20 border border-neon-pink/50 rounded text-sm text-neon-pink"
                    >
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Win Screen */}
        {gameState === 'won' && (
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-6 text-neon-pink">🎉 CODE CRACKED! 🎉</h2>
            <div className="text-3xl font-bold text-neon-cyan mb-4">
              Number: {secretNumber}
            </div>
            <div className="text-2xl font-bold text-neon-pink mb-4">
              {attempts} guess{attempts !== 1 ? 'es' : ''}
            </div>
            <div className="text-xl text-gray-400 mb-8">
              Time: {45 - timer}s
            </div>
            <button
              onClick={onBack}
              className="neon-button neon-button-cyan px-8 py-4 rounded-lg font-bold text-lg"
            >
              Back to Menu
            </button>
          </div>
        )}

        {/* Loss Screen */}
        {gameState === 'lost' && (
          <div className="text-center animate-pulse">
            <h2 className="text-6xl font-bold mb-6 text-red-500">❌ CODE FAILED!</h2>
            <div className="text-3xl font-bold text-red-400 mb-4">
              The number was: {secretNumber}
            </div>
            <div className="text-xl text-gray-400 mb-8">
              Better luck next time!
            </div>
            <button
              onClick={onBack}
              className="neon-button neon-button-cyan px-8 py-4 rounded-lg font-bold text-lg"
            >
              Back to Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
