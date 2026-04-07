import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage'
import LetsPlayPage from './components/LetsPlayPage'
import GameSettings from './components/GameSettings'
import GameBoard from './components/GameBoard'
import TwoPlayerSetup from './components/TwoPlayerSetup'
import TwoPlayerGame from './components/TwoPlayerGame'
import CrackTheCode from './components/CrackTheCode'
import HighScores from './components/HighScores'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
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

  const handleBackToHome = () => {
    setCurrentPage('home')
  }

  const handleBackToLetsPlay = () => {
    setCurrentPage('lets-play')
    setSelectedMode(null)
    setSelectedDifficulty(null)
    setTwoPlayerNumber(null)
  }

  return (
    <div className="min-h-screen bg-dark-bg text-white overflow-hidden relative">
      {/* Scan-line overlay - Cyberpunk effect */}
      <div className="scanline-overlay"></div>

      {/* Home - Professional Landing Page */}
      {currentPage === 'home' && (
        <LandingPage onLetsPlay={() => setCurrentPage('lets-play')} />
      )}

      {/* Let's Play - Game Mode Selection */}
      {currentPage === 'lets-play' && (
        <LetsPlayPage
          onBack={handleBackToHome}
          onModeSelect={handleModeSelect}
        />
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
          onBack={handleBackToLetsPlay}
        />
      )}
    </div>
  )
}
