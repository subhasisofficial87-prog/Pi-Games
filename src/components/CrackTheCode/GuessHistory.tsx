import React from 'react';

interface GuessHistoryProps {
  guesses: Array<{ code: string; feedback: string }>;
  secretCode: string;
}

export default function GuessHistory({ guesses, secretCode }: GuessHistoryProps) {
  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {guesses.map((guess, index) => (
        <div key={index} className="bg-black/30 rounded-lg p-3 border-l-4 border-pink-500">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-bold">Guess #{index + 1}: {guess.code}</span>
            <span className="text-sm text-gray-400">
              {guess.code === secretCode ? '✅ CORRECT!' : '❌'}
            </span>
          </div>
          <div className="flex gap-1 mb-2">
            {guess.code.split('').map((digit, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  backgroundColor:
                    secretCode[i] === digit
                      ? 'rgba(34, 197, 94, 0.3)'
                      : 'rgba(239, 68, 68, 0.2)',
                  color: secretCode[i] === digit ? '#22c55e' : '#ff6b6b',
                  border: `1px solid ${secretCode[i] === digit ? '#22c55e' : '#ff6b6b'}`,
                }}
              >
                {digit}
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-sm italic">{guess.feedback}</p>
        </div>
      ))}
    </div>
  );
}
