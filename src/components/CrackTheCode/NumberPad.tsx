import React, { useState } from 'react';
import { Delete, Send } from 'lucide-react';

interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
}

interface KeyState {
  [key: string]: boolean;
}

export default function NumberPad({ onDigit, onDelete, onSubmit, submitLabel = 'Submit' }: NumberPadProps) {
  const [pressedKeys, setPressedKeys] = useState<KeyState>({});

  const handleKeyDown = (key: string) => {
    setPressedKeys((prev) => ({ ...prev, [key]: true }));
  };

  const handleKeyUp = (key: string) => {
    setPressedKeys((prev) => ({ ...prev, [key]: false }));
  };

  const handleDigitClick = (digit: string) => {
    handleKeyDown(digit);
    onDigit(digit);
    setTimeout(() => handleKeyUp(digit), 150);
  };

  const handleDeleteClick = () => {
    handleKeyDown('delete');
    onDelete();
    setTimeout(() => handleKeyUp('delete'), 150);
  };

  const handleSubmitClick = () => {
    if (onSubmit) {
      handleKeyDown('submit');
      onSubmit();
      setTimeout(() => handleKeyUp('submit'), 150);
    }
  };

  const KeyButton = ({ digit, onClick, className = '' }: { digit: string; onClick: () => void; className?: string }) => {
    const isPressed = pressedKeys[digit];
    return (
      <button
        onMouseDown={() => handleKeyDown(digit)}
        onMouseUp={() => handleKeyUp(digit)}
        onClick={onClick}
        className={`
          py-4 px-3 rounded-xl text-white text-2xl font-bold
          transition-all duration-100 transform
          shadow-lg relative overflow-hidden
          ${className}
          ${
            isPressed
              ? 'scale-95 shadow-sm'
              : 'scale-100 hover:scale-110 active:scale-95'
          }
        `}
        style={{
          animation: isPressed ? 'none' : 'keypadHover 0.3s ease-out',
        }}
      >
        {/* Ripple effect */}
        {isPressed && (
          <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping" />
        )}
        <span className="relative z-10">{digit}</span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes keypadHover {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animated-keypad {
          animation: slideUp 0.6s ease-out;
        }

        .key-number {
          background: linear-gradient(135deg, #ef4444 0%, #ec4899 100%);
          position: relative;
        }

        .key-number:hover:not(:active) {
          background: linear-gradient(135deg, #f87171 0%, #f472b6 100%);
          box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4);
        }

        .key-delete {
          background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
        }

        .key-delete:hover:not(:active) {
          background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
          box-shadow: 0 10px 30px rgba(75, 85, 99, 0.4);
        }

        .key-submit {
          background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        }

        .key-submit:hover:not(:active) {
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
        }

        .key-submit:disabled {
          background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Number Grid with staggered animation */}
      <div className="animated-keypad grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
          <div
            key={num}
            style={{
              animation: `slideUp 0.6s ease-out ${index * 0.05}s both`,
            }}
          >
            <KeyButton
              digit={num.toString()}
              onClick={() => handleDigitClick(num.toString())}
              className="key-number w-full"
            />
          </div>
        ))}
      </div>

      {/* Bottom Row - 0, Delete, Submit */}
      <div className="grid grid-cols-3 gap-3">
        <div style={{ animation: 'slideUp 0.6s ease-out 0.45s both' }}>
          <KeyButton
            digit="0"
            onClick={() => handleDigitClick('0')}
            className="key-number w-full"
          />
        </div>

        <div style={{ animation: 'slideUp 0.6s ease-out 0.5s both' }}>
          <button
            onMouseDown={() => handleKeyDown('delete')}
            onMouseUp={() => handleKeyUp('delete')}
            onClick={handleDeleteClick}
            className={`
              w-full py-4 px-3 rounded-xl key-delete text-white
              transition-all duration-100 transform shadow-lg
              flex items-center justify-center
              ${pressedKeys['delete'] ? 'scale-95 shadow-sm' : 'scale-100 hover:scale-110 active:scale-95'}
            `}
          >
            <Delete className="w-6 h-6 relative z-10" />
          </button>
        </div>

        <div style={{ animation: 'slideUp 0.6s ease-out 0.55s both' }}>
          <button
            onMouseDown={() => onSubmit && handleKeyDown('submit')}
            onMouseUp={() => onSubmit && handleKeyUp('submit')}
            onClick={handleSubmitClick}
            disabled={!onSubmit}
            className={`
              w-full py-4 px-3 rounded-xl key-submit text-white
              transition-all duration-100 transform shadow-lg
              flex items-center justify-center gap-2 font-bold
              ${pressedKeys['submit'] ? 'scale-95 shadow-sm' : 'scale-100 hover:scale-110 active:scale-95'}
            `}
          >
            <Send className="w-5 h-5 relative z-10" />
          </button>
        </div>
      </div>

      {/* Submit Button (if provided) */}
      {onSubmit && submitLabel && (
        <button
          onMouseDown={() => handleKeyDown('submitLarge')}
          onMouseUp={() => handleKeyUp('submitLarge')}
          onClick={handleSubmitClick}
          style={{ animation: 'slideUp 0.6s ease-out 0.6s both' }}
          className={`
            w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500
            hover:from-red-400 hover:to-pink-400 text-white text-lg font-bold
            transition-all duration-100 transform shadow-lg
            ${pressedKeys['submitLarge'] ? 'scale-95 shadow-sm' : 'scale-100 hover:scale-105 active:scale-95'}
          `}
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
}
