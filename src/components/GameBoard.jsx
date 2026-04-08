import { useState, useEffect } from 'react';
import { getFeedback, saveScore } from '../gameLogic';
import Confetti from './Confetti';

export default function GameBoard({ difficulty, mode, onBack }) {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(60); // 60 seconds as per user spec
  const [feedback, setFeedback] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [showConfetti, setShowConfetti] = useState(false);
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);

  // Initialize game
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
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

    const feedbackData = getFeedback(numGuess, secretNumber, guessHistory);

    if (feedbackData.type === 'correct') {
      setGameState('won');
      setShowConfetti(true);
      saveScore(mode, difficulty, newAttempts, 60 - timer);
    } else {
      setGuessHistory([...guessHistory, numGuess]);
      setFeedback(feedbackData);

      // Update range based on feedback
      if (feedbackData.type === 'higher') {
        setMinRange(Math.max(minRange, numGuess + 1));
      } else if (feedbackData.type === 'lower') {
        setMaxRange(Math.min(maxRange, numGuess - 1));
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  const timerColor = timer > 20 ? 'text-neon-cyan' : timer > 10 ? 'text-yellow-400' : 'text-red-500';
  const timerShake = timer < 10 ? 'timer-critical' : '';
  const timerClass = timer < 10 ? 'timer-critical' : '';

  return (
    <div className="relative min-h-screen bg-dark-bg text-white flex flex-col">
      {showConfetti && <Confetti />}

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-neon-cyan/20">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg
            bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5
            border border-neon-cyan/40 hover:border-neon-cyan/80
            text-neon-cyan hover:text-white
            transition-all duration-300 transform hover:scale-105 active:scale-95
            font-semibold text-sm"
          title="Back to menu"
        >
          <span className="text-lg">🏠</span>
          Home
        </button>

        <div className={`text-lg font-bold ${timerColor} ${timerClass}`}>
          ⏱️ {timer}s
        </div>

        <div className="text-lg font-bold text-neon-cyan">
          Attempts: {attempts}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="p-2 hover:bg-neon-cyan/10 rounded-lg transition-all"
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
              <p className="text-gray-400 mb-2">I'm thinking of a number between</p>
              <div className="text-4xl font-bold">
                <span className="text-neon-pink floating-number">{minRange}</span>
                <span className="text-gray-400 mx-4">and</span>
                <span className="text-neon-pink floating-number">{maxRange}</span>
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
                  className="flex-1 px-6 py-4 bg-dark-bg border-2 border-neon-cyan rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-neon-cyan"
                  disabled={gameState !== 'playing'}
                />
                <button
                  onClick={handleGuess}
                  className="neon-button neon-button-cyan px-8 py-4 rounded-lg font-bold"
                  disabled={gameState !== 'playing'}
                >
                  Guess!
                </button>
              </div>

              {/* Feedback Message */}
              {feedback && (
                <div
                  className={`text-center text-lg font-bold py-3 px-4 rounded-lg animate-bounce ${
                    feedback.type === 'correct'
                      ? 'bg-green-500/20 text-green-400'
                      : feedback.type === 'error'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-neon-cyan/20 text-neon-cyan'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>

            {/* Guess History */}
            {guessHistory.length > 0 && (
              <div className="w-full max-w-2xl">
                <p className="text-gray-400 mb-3 text-sm">Your guesses:</p>
                <div className="flex flex-wrap gap-2">
                  {guessHistory.map((g, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 bg-neon-magenta/20 border border-neon-magenta/50 rounded text-sm text-neon-magenta"
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
            <h2 className="text-6xl font-bold mb-6 neon-heading">🎉 YOU WON! 🎉</h2>
            <div className="text-3xl font-bold text-neon-cyan mb-4">
              Guessed in {attempts} attempt{attempts !== 1 ? 's' : ''}
            </div>
            <div className="text-xl text-gray-400 mb-8">
              Time: {60 - timer}s
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
            <h2 className="text-6xl font-bold mb-6 text-red-500">⏰ TIME'S UP!</h2>
            <div className="text-3xl font-bold text-red-400 mb-4">
              The number was: {secretNumber}
            </div>
            <div className="text-xl text-gray-400 mb-8">
              You made {attempts} guess{attempts !== 1 ? 'es' : ''}
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
