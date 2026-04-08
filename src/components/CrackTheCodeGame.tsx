import React, { useState, useEffect } from 'react';
import CoupleChallenge from './CrackTheCode/CoupleChallenge';
import SoloMode from './CrackTheCode/SoloMode';
import ModeSelection from './CrackTheCode/ModeSelection';

type GameMode = 'selection' | 'couple' | 'solo';

export default function CrackTheCodeGame({ onBack }: { onBack: () => void }) {
  const [gameMode, setGameMode] = useState<GameMode>('selection');

  const handleModeSelect = (mode: 'couple' | 'solo') => {
    setGameMode(mode);
  };

  const handleBackToSelection = () => {
    setGameMode('selection');
  };

  const handleQuit = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Scan-line overlay */}
      <div className="scanline-overlay"></div>

      {/* Content */}
      <div className="relative z-10">
        {gameMode === 'selection' && (
          <ModeSelection onSelectMode={handleModeSelect} onBack={handleQuit} />
        )}

        {gameMode === 'couple' && (
          <CoupleChallenge onBack={handleBackToSelection} />
        )}

        {gameMode === 'solo' && (
          <SoloMode onBack={handleBackToSelection} />
        )}
      </div>
    </div>
  );
}
