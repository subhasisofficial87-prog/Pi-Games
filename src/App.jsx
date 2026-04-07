import { useState } from 'react'
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden">
      {/* Subtle scan-line effect background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%224%22><line x1=%220%22 y1=%221%22 x2=%22100%22 y2=%221%22 stroke=%22white%22 stroke-width=%221%22/></svg>')] bg-repeat"></div>

      {/* Landing Page */}
      {currentPage === 'landing' && (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
          {/* Main Content */}
          <div className="text-center max-w-2xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl font-bold mb-4 neon-heading">
              My Number Is?
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 mb-12">
              Guess the secret number before it's too late!
            </p>

            {/* Mode Buttons Container */}
            <div className="space-y-4 flex flex-col items-center">
              {/* Solo Game Button */}
              <button
                onClick={() => setCurrentPage('settings')}
                className="neon-button neon-button-cyan w-full md:w-80 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">▶</span>
                Solo Game
              </button>

              {/* 2 Player Mode Button */}
              <button
                onClick={() => setCurrentPage('settings')}
                className="neon-button neon-button-pink w-full md:w-80 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">👥</span>
                2 Player Mode
              </button>

              {/* Crack the Code Button */}
              <button
                onClick={() => setCurrentPage('settings')}
                className="neon-button neon-button-pink w-full md:w-80 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🔒</span>
                Crack the Code <span className="text-red-400">❤️</span>
              </button>
            </div>

            {/* Bottom Info Buttons */}
            <div className="flex gap-4 justify-center mt-12">
              <button className="neon-button-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 flex items-center gap-2">
                <span>ℹ️</span> How to Play
              </button>
              <button className="neon-button-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 flex items-center gap-2">
                <span>🏆</span> High Scores
                <span className="text-xs text-gray-500">(Login to save)</span>
              </button>
            </div>
          </div>

          {/* Lovable Badge - Bottom Right */}
          <div className="fixed bottom-4 right-4 text-xs text-gray-600">
            Built with Vite + React + Tailwind
          </div>
        </div>
      )}

      {/* Settings Page Placeholder */}
      {currentPage === 'settings' && (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 neon-heading">Game Settings</h2>
            <p className="text-gray-400 mb-8">Settings UI coming in Phase 2...</p>
            <button
              onClick={() => setCurrentPage('landing')}
              className="neon-button neon-button-cyan px-8 py-3 rounded-lg font-bold"
            >
              Back to Landing
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
