import { useState, useEffect } from 'react';
import { saveScore } from '../gameLogic';
import Confetti from './Confetti';

export default function TwoPlayerGame({ secretNumber, onBack }) {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won
  const [showConfetti, setShowConfetti] = useState(false);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);

  const handleGuess = () => {
    if (!guess || gameState !== 'playing') return;

    const numGuess = parseInt(guess);

    if (isNaN(numGuess)) {
      setFeedback({ type: 'error', message: '❌ Enter a valid number' });
      return;
    }

    if (numGuess < minRange || numGuess > maxRange) {
      setFeedback({
        type: 'error',
        message: `❌ Enter a number between ${minRange} and ${maxRange}`
      });
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuess('');

    if (numGuess === secretNumber) {
      setGameState('won');
      setShowConfetti(true);
      saveScore('2player', 'medium', newAttempts, 0);
    } else {
      if (numGuess < secretNumber) {
        setFeedback({ type: 'higher', message: '📈 Too low! Try higher' });
        setMinRange(Math.max(minRange, numGuess + 1));
      } else {
        setFeedback({ type: 'lower', message: '📉 Too high! Try lower' });
        setMaxRange(Math.min(maxRange, numGuess - 1));
      }
      setGuessHistory([...guessHistory, numGuess]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

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

        <div className="text-lg font-bold text-neon-pink">
          👥 Player 2's Turn
        </div>

        <div className="text-lg font-bold text-neon-pink">
          Guesses: {attempts}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="p-2 hover:bg-neon-pink/10 rounded-lg transition-all"
          title="Undo"
        >
          ↻
        </button>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {gameState === 'playing' && (
          <>
            {/* Range Display */}
            <div className="text-center mb-8">
              <p className="text-gray-400 mb-2">The secret number is between</p>
              <div className="text-4xl font-bold">
                <span className="text-neon-pink">{minRange}</span>
                <span className="text-gray-400 mx-4">and</span>
                <span className="text-neon-pink">{maxRange}</span>
              </div>
            </div>

            {/* Input Section */}
            <div className="w-full max-w-2xl mb-8">
              <div className="flex gap-3 mb-6">
                <input
                  type="number"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your guess..."
                  className="flex-1 px-6 py-4 bg-dark-bg border-2 border-neon-pink rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink focus:border-neon-pink"
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

              {/* Feedback Message */}
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
                <p className="text-gray-400 mb-3 text-sm">Guesses so far:</p>
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
            <h2 className="text-6xl font-bold mb-6 neon-heading">
              🎉 Player 2 Won! 🎉
            </h2>
            <div className="text-3xl font-bold text-neon-pink mb-4">
              Found the number in {attempts} guess{attempts !== 1 ? 'es' : ''}
            </div>
            <div className="text-2xl font-bold text-neon-cyan mb-8">
              The secret number was: {secretNumber}
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
