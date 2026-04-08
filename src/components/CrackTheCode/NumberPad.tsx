import React from 'react';
import { Backspace, Send } from 'lucide-react';

interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
}

export default function NumberPad({ onDigit, onDelete, onSubmit, submitLabel = 'Submit' }: NumberPadProps) {
  return (
    <div className="space-y-3">
      {/* Number Grid */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onDigit(num.toString())}
            className="py-4 px-3 rounded-xl bg-gradient-to-b from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white text-2xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Bottom Row - 0, Delete, Submit */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onDigit('0')}
          className="py-4 px-3 rounded-xl bg-gradient-to-b from-red-500 to-pink-600 hover:from-red-400 hover:to-pink-500 text-white text-2xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg col-span-1"
        >
          0
        </button>

        <button
          onClick={onDelete}
          className="py-4 px-3 rounded-xl bg-gradient-to-b from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center"
        >
          <Backspace className="w-6 h-6" />
        </button>

        <button
          onClick={onSubmit}
          disabled={!onSubmit}
          className="py-4 px-3 rounded-xl bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center gap-2 font-bold"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Submit Button (if provided) */}
      {onSubmit && submitLabel && (
        <button
          onClick={onSubmit}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white text-lg font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
}
