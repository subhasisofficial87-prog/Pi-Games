import React, { useEffect } from 'react';
import { Share2, RotateCcw } from 'lucide-react';

interface WinScreenProps {
  attempts: number;
  bestScore?: number | null;
  onPlayAgain: () => void;
  onBack: () => void;
  gameMode: 'couple' | 'solo';
  onWinSoundPlay?: () => void;
}

export default function WinScreen({
  attempts,
  bestScore,
  onPlayAgain,
  onBack,
  gameMode,
  onWinSoundPlay,
}: WinScreenProps) {
  useEffect(() => {
    onWinSoundPlay?.();
  }, [onWinSoundPlay]);

  const getMessage = () => {
    if (attempts === 1) return 'IMPOSSIBLE! 🎯';
    if (attempts <= 3) return 'INCREDIBLE! 🔥';
    if (attempts <= 5) return 'AMAZING! 🎉';
    return 'CODE CRACKED! ✅';
  };

  const handleShare = () => {
    const text = `I just cracked the code in ${attempts} attempt${attempts !== 1 ? 's' : ''}! ${gameMode === 'couple' ? 'Can you beat me?' : '🤖'}`;
    if (navigator.share) {
      navigator.share({
        title: 'Crack the Code',
        text: text,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Score copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Confetti animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array(50)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 pointer-events-none"
              style={{
                left: Math.random() * 100 + '%',
                top: -10 + '%',
                animation: `fall ${2 + Math.random() * 2}s linear forwards`,
                backgroundColor: ['#ff0080', '#ff6b6b', '#ffa000', '#ff1744'][Math.floor(Math.random() * 4)],
                animationDelay: Math.random() * 0.5 + 's',
              }}
            />
          ))}
      </div>

      {/* Style for confetti animation */}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Win Screen Content */}
      <div className="w-full max-w-md text-center">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-red-400 mb-4">
          {getMessage()}
        </h1>

        <div className="bg-gradient-to-b from-red-950/40 to-pink-950/40 rounded-2xl p-8 mb-8 border-2 border-pink-500/30">
          <p className="text-gray-400 text-lg mb-2">You cracked the code in</p>
          <p className="text-5xl font-bold text-red-400 mb-4">{attempts}</p>
          <p className="text-gray-400">
            attempt{attempts !== 1 ? 's' : ''}
            {gameMode === 'couple' ? ' 💕' : ''}
          </p>

          {bestScore && gameMode === 'solo' && (
            <div className="mt-6 pt-6 border-t border-pink-500/30">
              <p className="text-gray-500 text-sm mb-2">Your Best Score</p>
              <p className="text-3xl font-bold text-green-400">{bestScore}</p>
              <p className="text-gray-500 text-xs">
                attempt{bestScore !== 1 ? 's' : ''}
              </p>
              {attempts < bestScore && (
                <p className="text-green-400 text-sm mt-2">🎯 New Personal Best!</p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white text-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>

          <button
            onClick={handleShare}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white text-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Score
          </button>

          <button
            onClick={onBack}
            className="w-full py-4 px-6 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold transition-all duration-200"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
