import React from 'react';
import { Heart, Users, Gamepad2 } from 'lucide-react';

interface ModeSelectionProps {
  onSelectMode: (mode: 'couple' | 'solo') => void;
  onBack: () => void;
}

export default function ModeSelection({ onSelectMode, onBack }: ModeSelectionProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-red-400">
          Crack the Code ❤️
        </h1>
        <p className="text-xl text-gray-300 mb-2">Guess your partner's (or the computer's) secret 4-digit code</p>
        <p className="text-sm text-gray-500">Just like the viral TikTok couple challenge!</p>
      </div>

      {/* Mode Selection Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mb-8">
        {/* Brain Mate Card */}
        <div
          onClick={() => onSelectMode('couple')}
          className="group cursor-pointer p-8 rounded-2xl border-2 border-pink-500/30 bg-gradient-to-br from-pink-950/40 to-red-950/40 hover:border-pink-500/80 hover:bg-pink-950/60 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-red-400 group-hover:animate-bounce" fill="currentColor" />
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-3">Brain Mate 🧠</h2>
          <p className="text-gray-300 text-center mb-4">
            Play with a friend! One person sets the code, the other guesses. Funny reactions included! 🔥
          </p>
          <ul className="text-sm text-gray-400 space-y-2 text-center">
            <li>✓ Hotseat mode</li>
            <li>✓ Fun reactions</li>
            <li>✓ Perfect for friends & partners</li>
          </ul>
        </div>

        {/* Solo Mode Card */}
        <div
          onClick={() => onSelectMode('solo')}
          className="group cursor-pointer p-8 rounded-2xl border-2 border-red-500/30 bg-gradient-to-br from-red-950/40 to-pink-950/40 hover:border-red-500/80 hover:bg-red-950/60 transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex justify-center mb-4">
            <Gamepad2 className="w-16 h-16 text-red-400 group-hover:animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-center text-white mb-3">Solo Challenge</h2>
          <p className="text-gray-300 text-center mb-4">
            Challenge the computer! See how many attempts it takes you to crack the code. Track your best score!
          </p>
          <ul className="text-sm text-gray-400 space-y-2 text-center">
            <li>✓ VS Computer</li>
            <li>✓ Score tracking</li>
            <li>✓ Leaderboard</li>
          </ul>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 px-6 py-3 rounded-lg font-bold
          bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5
          border border-neon-cyan/40 hover:border-neon-cyan/80
          text-neon-cyan hover:text-white
          transition-all duration-300 transform hover:scale-105 active:scale-95
          shadow-lg hover:shadow-neon-cyan/50"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to Menu
      </button>
    </div>
  );
}
