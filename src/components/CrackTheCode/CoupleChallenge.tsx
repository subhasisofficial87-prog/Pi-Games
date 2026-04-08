import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import NumberPad from './NumberPad';
import GuessHistory from './GuessHistory';
import ReactionPopup from './ReactionPopup';
import WinScreen from './WinScreen';
import { generateFeedback, getReactionMessage } from '../../utils/gameUtils';

type GamePhase = 'setup' | 'guessing' | 'won';

interface Guess {
  code: string;
  feedback: string;
}

const FUNNY_REACTIONS = [
  'OH MY GOD! 🔥',
  'NO WAY!!! 😱',
  'YEEESSS! 🎉',
  'ARE YOU KIDDING ME? 😤',
  'I KNEW IT! 😏',
  'STOP IT RIGHT NOW! 🤭',
  'HOW DID YOU GET THAT?! 😲',
  'EEEEEHHHHH!!! 🔥',
  'YOU\'RE INSANE! 🤯',
  'I HATE YOU! 😂❤️',
];

export default function CoupleChallenge({ onBack }: { onBack: () => void }) {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [secretCode, setSecretCode] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState<Guess[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [showReaction, setShowReaction] = useState(false);
  const [reactionText, setReactionText] = useState('');

  // Setup Phase - Player 1 enters code
  const handleCodeEntry = (digit: string) => {
    if (currentGuess.length < 4) {
      setCurrentGuess(currentGuess + digit);
    }
  };

  const handleCodeDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleStartGame = () => {
    if (currentGuess.length === 4) {
      setSecretCode(currentGuess);
      setCurrentGuess('');
      setGamePhase('guessing');
    }
  };

  // Guessing Phase - Player 2 guesses
  const handleGuess = (digit: string) => {
    if (currentGuess.length < 4) {
      setCurrentGuess(currentGuess + digit);
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length === 4) {
      const feedback = generateFeedback(currentGuess, secretCode);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setGuessHistory([...guessHistory, { code: currentGuess, feedback }]);

      // Show funny reaction
      const reaction = FUNNY_REACTIONS[Math.floor(Math.random() * FUNNY_REACTIONS.length)];
      setReactionText(reaction);
      setShowReaction(true);
      setTimeout(() => setShowReaction(false), 2000);

      // Play sound
      if (soundOn) playSound();

      if (currentGuess === secretCode) {
        setGamePhase('won');
      }

      setCurrentGuess('');
    }
  };

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playWinSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = audioContext.currentTime + index * 0.15;
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.2);
    });
  };

  if (gamePhase === 'won') {
    return (
      <WinScreen
        attempts={attempts}
        onPlayAgain={() => {
          setSecretCode('');
          setCurrentGuess('');
          setGuessHistory([]);
          setAttempts(0);
          setGamePhase('setup');
        }}
        onBack={onBack}
        gameMode="couple"
        onWinSoundPlay={soundOn ? playWinSound : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header with Sound Toggle */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="p-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/40 transition-all"
          title={soundOn ? 'Sound ON' : 'Sound OFF'}
        >
          {soundOn ? (
            <Volume2 className="w-6 h-6 text-red-400" />
          ) : (
            <VolumeX className="w-6 h-6 text-gray-500" />
          )}
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all text-gray-300"
        >
          ← Back
        </button>
      </div>

      {gamePhase === 'setup' ? (
        // PLAYER 1: CODE SETUP
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" fill="currentColor" />
            <h2 className="text-3xl font-bold text-white mb-2">Brain Mate 🧠 - Player 1: Set the Code</h2>
            <p className="text-gray-300">Enter your secret 4-digit code (0-9)</p>
            <p className="text-sm text-gray-500 mt-2">Keep it hidden from your partner! 🤫</p>
          </div>

          {/* Code Display */}
          <div className="bg-gradient-to-b from-red-950/40 to-pink-950/40 rounded-2xl p-8 mb-8 border-2 border-pink-500/30">
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-32 h-32 bg-black/50 rounded-xl flex items-center justify-center text-6xl font-bold text-red-400 border-2 border-red-500/50 transition-all duration-200"
                  style={{
                    transform: currentGuess[i] ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: currentGuess[i] ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none',
                  }}
                >
                  {currentGuess[i] || '-'}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm">
              {currentGuess.length === 0 ? 'Tap numbers below' : `${currentGuess.length}/4 digits entered`}
            </p>
          </div>

          {/* Number Pad */}
          <NumberPad
            onDigit={handleCodeEntry}
            onDelete={handleCodeDelete}
            onSubmit={currentGuess.length === 4 ? handleStartGame : undefined}
            submitLabel="Player 2 Ready! 👉"
          />
        </div>
      ) : (
        // PLAYER 2: GUESSING PHASE
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
              🔓 Brain Mate 🧠 - Player 2: Crack the Code!
            </h2>
            <p className="text-gray-300">
              Attempts: <span className="text-red-400 text-2xl font-bold">{attempts}</span>
            </p>
          </div>

          {/* Current Guess Display */}
          <div className="bg-gradient-to-b from-red-950/40 to-pink-950/40 rounded-2xl p-8 mb-6 border-2 border-pink-500/30">
            <div className="flex justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-32 h-32 bg-black/50 rounded-xl flex items-center justify-center text-6xl font-bold border-2 transition-all duration-200"
                  style={{
                    color: currentGuess[i]
                      ? secretCode[i] === currentGuess[i]
                        ? '#22c55e'
                        : '#ff6b6b'
                      : '#666',
                    borderColor:
                      currentGuess[i]
                        ? secretCode[i] === currentGuess[i]
                          ? '#22c55e'
                          : '#ff6b6b'
                        : '#ff000080',
                    transform: currentGuess[i] ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: currentGuess[i]
                      ? secretCode[i] === currentGuess[i]
                        ? '0 0 20px rgba(34, 197, 94, 0.5)'
                        : '0 0 20px rgba(255, 107, 107, 0.5)'
                      : 'none',
                  }}
                >
                  {currentGuess[i] || '-'}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm">
              {currentGuess.length === 0
                ? 'Start guessing...'
                : currentGuess.length === 4
                ? 'Press SUBMIT to guess'
                : `${currentGuess.length}/4 digits`}
            </p>
          </div>

          {/* Number Pad */}
          <NumberPad
            onDigit={handleGuess}
            onDelete={handleCodeDelete}
            onSubmit={currentGuess.length === 4 ? handleSubmitGuess : undefined}
            submitLabel="📤 Submit Guess"
          />

          {/* Guess History */}
          {guessHistory.length > 0 && (
            <div className="mt-8">
              <h3 className="text-white font-bold mb-4 text-center">Previous Attempts</h3>
              <GuessHistory guesses={guessHistory} secretCode={secretCode} />
            </div>
          )}
        </div>
      )}

      {/* Reaction Popup */}
      {showReaction && <ReactionPopup text={reactionText} />}

      {/* Pass the Phone Button (between phases) */}
      {gamePhase === 'guessing' && attempts === 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="animate-bounce text-center">
            <p className="text-3xl font-bold text-white mb-2">📱</p>
            <p className="text-2xl font-bold text-red-400">PASS THE PHONE! 👉</p>
          </div>
        </div>
      )}
    </div>
  );
}
