import { useState, useEffect } from 'react';

export default function HighScores({ onBack }) {
  const [scores, setScores] = useState([]);
  const [filter, setFilter] = useState('all'); // all, solo, 2player, crack

  useEffect(() => {
    const allScores = JSON.parse(localStorage.getItem('neonGameScores') || '[]');

    let filtered = allScores;
    if (filter !== 'all') {
      filtered = allScores.filter(s => s.mode === filter);
    }

    // Sort by attempts (ascending) then by time (ascending)
    const sorted = filtered.sort((a, b) => {
      if (a.attempts === b.attempts) {
        return a.timeUsed - b.timeUsed;
      }
      return a.attempts - b.attempts;
    }).slice(0, 10);

    setScores(sorted);
  }, [filter]);

  const getModeLabel = (mode) => {
    switch (mode) {
      case 'solo':
        return '🎮 Solo Game';
      case '2player':
        return '👥 2 Player';
      case 'crack':
        return '🔒 Crack the Code';
      default:
        return mode;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-neon-cyan';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 py-8">
      <div className="bg-dark-bg border-2 border-neon-cyan/50 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-neon-cyan transition-colors"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold mb-8 text-center neon-heading">
          🏆 High Scores
        </h2>

        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          {[
            { id: 'all', label: 'All Games' },
            { id: 'solo', label: '🎮 Solo' },
            { id: '2player', label: '👥 2 Player' },
            { id: 'crack', label: '🔒 Crack' }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                filter === f.id
                  ? 'bg-neon-cyan text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Scores Table */}
        {scores.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-neon-cyan/30">
                  <th className="px-4 py-3 text-neon-cyan font-bold">Rank</th>
                  <th className="px-4 py-3 text-neon-cyan font-bold">Game Mode</th>
                  <th className="px-4 py-3 text-neon-cyan font-bold">Difficulty</th>
                  <th className="px-4 py-3 text-neon-cyan font-bold">Attempts</th>
                  <th className="px-4 py-3 text-neon-cyan font-bold">Time</th>
                  <th className="px-4 py-3 text-neon-cyan font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, index) => (
                  <tr
                    key={score.id}
                    className="border-b border-gray-700/30 hover:bg-neon-cyan/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-neon-pink">#{index + 1}</td>
                    <td className="px-4 py-3">{getModeLabel(score.mode)}</td>
                    <td className={`px-4 py-3 font-bold ${getDifficultyColor(score.difficulty)}`}>
                      {score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1)}
                    </td>
                    <td className="px-4 py-3 text-neon-cyan font-bold">{score.attempts}</td>
                    <td className="px-4 py-3 text-gray-400">{score.timeUsed}s</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">
                      {new Date(score.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-400 mb-4">No scores yet!</p>
            <p className="text-gray-500">Play a game to see your scores here.</p>
          </div>
        )}

        {/* Close Button at Bottom */}
        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="neon-button neon-button-cyan px-8 py-3 rounded-lg font-bold"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
