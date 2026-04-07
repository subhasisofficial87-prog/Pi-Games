import { useState } from 'react';

export default function GameSettings({ mode, onStart, onBack }) {
  const [difficulty, setDifficulty] = useState('medium');
  const [customMin, setCustomMin] = useState(1);
  const [customMax, setCustomMax] = useState(100);

  const difficulties = [
    { id: 'easy', label: 'Easy', range: '1 - 50' },
    { id: 'medium', label: 'Medium', range: '1 - 100' },
    { id: 'hard', label: 'Hard', range: '1 - 1,000' },
    { id: 'custom', label: 'Custom', range: 'You choose' }
  ];

  const handleStart = () => {
    onStart(difficulty);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-dark-bg border-2 border-neon-cyan/50 rounded-2xl p-8 max-w-2xl w-full">
        {/* Close Button */}
        <button
          onClick={onBack}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-neon-cyan transition-colors"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-4xl font-bold mb-8 text-center neon-heading">
          Game Settings
        </h2>

        {/* Difficulty Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {difficulties.map((d) => (
            <button
              key={d.id}
              onClick={() => setDifficulty(d.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${
                difficulty === d.id
                  ? 'border-neon-cyan bg-neon-cyan/10'
                  : 'border-gray-600 bg-gray-900/30 hover:border-neon-cyan/50'
              }`}
            >
              <div className="text-xl font-bold mb-2">{d.label}</div>
              <div className="text-sm text-gray-400">{d.range}</div>
            </button>
          ))}
        </div>

        {/* Custom Range Inputs */}
        {difficulty === 'custom' && (
          <div className="bg-dark-bg border border-neon-cyan/30 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Min Number</label>
                <input
                  type="number"
                  value={customMin}
                  onChange={(e) => setCustomMin(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 bg-dark-bg border border-neon-cyan/50 rounded text-neon-cyan focus:outline-none focus:border-neon-cyan"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Max Number</label>
                <input
                  type="number"
                  value={customMax}
                  onChange={(e) => setCustomMax(Math.max(customMin + 1, parseInt(e.target.value) || 100))}
                  className="w-full px-4 py-2 bg-dark-bg border border-neon-cyan/50 rounded text-neon-cyan focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </div>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full neon-button neon-button-cyan py-4 rounded-lg font-bold text-lg"
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
}
