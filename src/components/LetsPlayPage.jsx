export default function LetsPlayPage({ onBack, onModeSelect }) {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Scan-line overlay */}
      <div className="scanline-overlay"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-bg/95 border-b border-neon-cyan/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5
              border border-neon-cyan/40 hover:border-neon-cyan/80
              text-neon-cyan hover:text-white
              transition-all duration-300 transform hover:scale-105 active:scale-95
              font-semibold text-sm"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </button>
          <div className="flex items-center gap-3">
            <img src="/neon-numbers-logo.svg" alt="Neon Numbers" className="w-10 h-10" />
            <div className="text-2xl font-bold neon-heading">Neon Numbers</div>
          </div>
          <div className="w-20"></div> {/* Spacer for alignment */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 neon-heading">
            My Number Is?
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Guess the secret number before it's too late!
          </p>
        </div>

        {/* Game Mode Buttons */}
        <div className="max-w-2xl mx-auto space-y-4 mb-12">
          {/* Solo Game Button */}
          <button
            onClick={() => onModeSelect('solo')}
            className="w-full neon-button neon-button-cyan px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">▶</span>
            Solo Game
          </button>

          {/* 2 Player Mode Button */}
          <button
            onClick={() => onModeSelect('2player')}
            className="w-full neon-button neon-button-pink px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">👥</span>
            2 Player Mode
          </button>

          {/* Crack the Code Button */}
          <button
            onClick={() => onModeSelect('crack')}
            className="w-full neon-button neon-button-pink px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🔒</span>
            Crack the Code <span className="text-red-400">❤️</span>
          </button>
        </div>

        {/* Numbers Tab Button */}
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => onModeSelect('solo')}
            className="w-full neon-button neon-button-cyan px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 bg-neon-cyan/20 border-2 border-neon-cyan"
          >
            <span className="text-2xl">🔢</span>
            Numbers Game
          </button>
        </div>

        {/* Info Buttons */}
        <div className="flex gap-4 justify-center mt-12 flex-wrap max-w-2xl mx-auto">
          <button className="neon-button-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 flex items-center gap-2">
            <span>ℹ️</span> How to Play
          </button>
          <button className="neon-button-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 flex items-center gap-2">
            <span>🏆</span> High Scores
          </button>
        </div>
      </div>
    </div>
  );
}
