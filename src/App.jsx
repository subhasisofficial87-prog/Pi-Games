import { useState } from 'react'
import './App.css'
import GameSettings from './components/GameSettings'
import GameBoard from './components/GameBoard'
import TwoPlayerSetup from './components/TwoPlayerSetup'
import TwoPlayerGame from './components/TwoPlayerGame'
import CrackTheCode from './components/CrackTheCode'
import HighScores from './components/HighScores'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedMode, setSelectedMode] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [twoPlayerNumber, setTwoPlayerNumber] = useState(null)

  const handleModeSelect = (mode) => {
    setSelectedMode(mode)
    if (mode === 'solo') {
      setCurrentPage('settings')
    } else if (mode === '2player') {
      setCurrentPage('2player-setup')
    } else if (mode === 'crack') {
      setCurrentPage('crack')
    }
  }

  const handleGameStart = (difficulty) => {
    setSelectedDifficulty(difficulty)
    setCurrentPage('game')
  }

  const handle2PlayerStart = (number) => {
    setTwoPlayerNumber(number)
    setCurrentPage('2player-game')
  }

  const handleBackToMenu = () => {
    setCurrentPage('landing')
    setSelectedMode(null)
    setSelectedDifficulty(null)
    setTwoPlayerNumber(null)
  }

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
                onClick={() => handleModeSelect('solo')}
                className="neon-button neon-button-cyan w-full md:w-80 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">▶</span>
                Solo Game
              </button>

              {/* 2 Player Mode Button */}
              <button
                onClick={() => handleModeSelect('2player')}
                className="neon-button neon-button-pink w-full md:w-80 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">👥</span>
                2 Player Mode
              </button>

              {/* Crack the Code Button */}
              <button
                onClick={() => handleModeSelect('crack')}
                className="neon-button neon-button-pink w-full md:w-80 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
              >
                <span className="text-2xl">🔒</span>
                Crack the Code <span className="text-red-400">❤️</span>
              </button>
            </div>

            {/* Bottom Info Buttons */}
            <div className="flex gap-4 justify-center mt-12 flex-wrap">
              <button className="neon-button-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 flex items-center gap-2">
                <span>ℹ️</span> How to Play
              </button>
              <button
                onClick={() => setCurrentPage('highscores')}
                className="neon-button-secondary px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:bg-opacity-80 flex items-center gap-2"
              >
                <span>🏆</span> High Scores
              </button>
            </div>
          </div>

          {/* Built with Badge - Bottom Right */}
          <div className="fixed bottom-4 right-4 text-xs text-gray-600">
            Built with Vite + React + Tailwind
          </div>
        </div>
      )}

      {/* Game Settings Modal - Solo Game */}
      {currentPage === 'settings' && selectedMode === 'solo' && (
        <GameSettings
          mode={selectedMode}
          onStart={handleGameStart}
          onBack={() => setCurrentPage('landing')}
        />
      )}

      {/* Solo Game Board */}
      {currentPage === 'game' && selectedMode === 'solo' && selectedDifficulty && (
        <GameBoard
          difficulty={selectedDifficulty}
          mode={selectedMode}
          onBack={handleBackToMenu}
        />
      )}

      {/* 2 Player Setup */}
      {currentPage === '2player-setup' && (
        <TwoPlayerSetup
          onStart={handle2PlayerStart}
          onBack={() => setCurrentPage('landing')}
        />
      )}

      {/* 2 Player Game */}
      {currentPage === '2player-game' && twoPlayerNumber !== null && (
        <TwoPlayerGame
          secretNumber={twoPlayerNumber}
          onBack={handleBackToMenu}
        />
      )}

      {/* Crack the Code Game */}
      {currentPage === 'crack' && (
        <CrackTheCode
          difficulty="hard"
          onBack={() => setCurrentPage('landing')}
        />
      )}

      {/* High Scores Modal */}
      {currentPage === 'highscores' && (
        <HighScores
          onBack={() => setCurrentPage('landing')}
        />
      )}
    </div>
  )
}
