import { useState } from 'react';

export default function TwoPlayerSetup({ onStart, onBack }) {
  const [playerNumber, setPlayerNumber] = useState('');
  const [showNumber, setShowNumber] = useState(false);
  const [step, setStep] = useState('player1'); // player1, confirm, player2

  const handleSetNumber = () => {
    const num = parseInt(playerNumber);
    if (isNaN(num) || num < 1 || num > 100) {
      alert('Please enter a number between 1 and 100');
      return;
    }
    setShowNumber(true);
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('player2');
  };

  const handleStartGame = () => {
    onStart(parseInt(playerNumber));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-dark-bg border-2 border-neon-pink/50 rounded-2xl p-8 max-w-2xl w-full">
        {/* Close Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-neon-pink transition-colors"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold mb-8 text-center text-neon-pink">
          2 Player Mode
        </h2>

        {step === 'player1' && (
          <div className="space-y-6">
            <div>
              <label className="text-lg font-bold text-gray-300 block mb-3">
                👤 Player 1: Think of a number (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={playerNumber}
                onChange={(e) => setPlayerNumber(e.target.value)}
                placeholder="Enter your secret number"
                className="w-full px-6 py-4 bg-dark-bg border-2 border-neon-pink rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-pink"
              />
            </div>
            <button
              onClick={handleSetNumber}
              disabled={!playerNumber}
              className="w-full neon-button neon-button-pink py-4 rounded-lg font-bold text-lg disabled:opacity-50"
            >
              Set Number
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-6">
            <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-6 text-center">
              <p className="text-gray-300 mb-2">Your secret number is:</p>
              <p className="text-6xl font-bold text-neon-pink">
                {showNumber ? playerNumber : '****'}
              </p>
            </div>
            <p className="text-gray-400 text-center">
              Remember this number! You'll need to hide the screen from Player 2.
            </p>
            <button
              onClick={handleConfirm}
              className="w-full neon-button neon-button-pink py-4 rounded-lg font-bold text-lg"
            >
              Player 2 is Ready
            </button>
          </div>
        )}

        {step === 'player2' && (
          <div className="space-y-6">
            <div className="bg-neon-pink/10 border border-neon-pink/30 rounded-lg p-6 text-center">
              <p className="text-2xl font-bold text-neon-pink mb-2">🎮 Player 2's Turn!</p>
              <p className="text-gray-300">Get ready to guess the secret number</p>
            </div>
            <button
              onClick={handleStartGame}
              className="w-full neon-button neon-button-cyan py-4 rounded-lg font-bold text-lg"
            >
              Start Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
