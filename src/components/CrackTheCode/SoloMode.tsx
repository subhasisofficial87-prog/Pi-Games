import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import NumberPad from './NumberPad';
import GuessHistory from './GuessHistory';
import WinScreen from './WinScreen';
import { generateFeedback } from '../../utils/gameUtils';

type GamePhase = 'playing' | 'won';

interface Guess {
  code: string;
  feedback: string;
}

interface Score {
  attempts: number;
  timestamp: number;
}

export default function SoloMode({ onBack }: { onBack: () => void }) {
  const [gamePhase, setGamePhase] = useState<GamePhase>('playing');
  const [secretCode, setSecretCode] = useState(() =>
    Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 10).toString())
      .join('')
  );
  const [currentGuess, setCurrentGuess] = useState('');
  const [guessHistory, setGuessHistory] = useState<Guess[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    const scores = localStorage.getItem('crackTheCodeScores');
    if (scores) {
      const parsedScores: Score[] = JSON.parse(scores);
      if (parsedScores.length > 0) {
        const best = Math.min(...parsedScores.map((s) => s.attempts));
        setBestScore(best);
      }
    }
  }, []);

  const handleGuess = (digit: string) => {
    if (currentGuess.length < 4) {
      setCurrentGuess(currentGuess + digit);
    }
  };

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length === 4) {
      const feedback = generateFeedback(currentGuess, secretCode);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setGuessHistory([...guessHistory, { code: currentGuess, feedback }]);

      if (soundOn) playSound();

      if (currentGuess === secretCode) {
        // Save score
        const existingScores = localStorage.getItem('crackTheCodeScores');
        const scores: Score[] = existingScores ? JSON.parse(existingScores) : [];
        scores.push({ attempts: newAttempts, timestamp: Date.now() });
        localStorage.setItem('crackTheCodeScores', JSON.stringify(scores));
        setBestScore(Math.min(...scores.map((s) => s.attempts)));

        setGamePhase('won');
        if (soundOn) playWinSound();
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
    const notes = [523, 659, 784, 1047];

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
          setSecretCode(
            Array(4)
              .fill(0)
              .map(() => Math.floor(Math.random() * 10).toString())
              .join('')
          );
          setCurrentGuess('');
          setGuessHistory([]);
          setAttempts(0);
          setGamePhase('playing');
        }}
        onBack={onBack}
        gameMode="solo"
        bestScore={bestScore}
        onWinSoundPlay={soundOn ? playWinSound : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Header */}
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
          className="group flex items-center gap-2 px-4 py-2 rounded-lg
            bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5
            border border-neon-cyan/40 hover:border-neon-cyan/80
            text-neon-cyan hover:text-white
            transition-all duration-300 transform hover:scale-105 active:scale-95
            font-semibold text-sm shadow-lg hover:shadow-neon-cyan/50"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Back
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">🤖 VS Computer</h2>
          <p className="text-gray-300">
            Attempts: <span className="text-red-400 text-2xl font-bold">{attempts}</span>
          </p>
          {bestScore && (
            <p className="text-sm text-green-400 mt-2">
              Best Score: {bestScore} attempt{bestScore !== 1 ? 's' : ''}
            </p>
          )}
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
              ? 'Guess the 4-digit code...'
              : currentGuess.length === 4
              ? 'Press SUBMIT to guess'
              : `${currentGuess.length}/4 digits`}
          </p>
        </div>

        {/* Number Pad */}
        <NumberPad
          onDigit={handleGuess}
          onDelete={handleDelete}
          onSubmit={currentGuess.length === 4 ? handleSubmitGuess : undefined}
          submitLabel="🤖 Submit Guess"
        />

        {/* Guess History */}
        {guessHistory.length > 0 && (
          <div className="mt-8">
            <h3 className="text-white font-bold mb-4 text-center">Your Attempts</h3>
            <GuessHistory guesses={guessHistory} secretCode={secretCode} />
          </div>
        )}
      </div>
    </div>
  );
}
