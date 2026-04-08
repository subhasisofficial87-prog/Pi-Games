import React, { useState } from 'react';
import { Delete, Send } from 'lucide-react';

interface NumberPadProps {
  onDigit: (digit: string) => void;
  onDelete: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  variant?: 'compact' | 'large';
}

interface KeyState {
  [key: string]: boolean;
}

export default function NumberPad({
  onDigit,
  onDelete,
  onSubmit,
  submitLabel = 'Submit',
  variant = 'large',
}: NumberPadProps) {
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

  const isCompact = variant === 'compact';
  const keySize = isCompact ? 'py-3 px-2 text-lg' : 'py-4 px-3 text-2xl';

  const KeyButton = ({
    digit,
    onClick,
    className = '',
    type = 'number',
  }: {
    digit: string;
    onClick: () => void;
    className?: string;
    type?: 'number' | 'delete' | 'submit';
  }) => {
    const isPressed = pressedKeys[digit];

    let keyTypeClass = 'key-number';
    if (type === 'delete') keyTypeClass = 'key-delete';
    if (type === 'submit') keyTypeClass = 'key-submit';

    return (
      <button
        onMouseDown={() => handleKeyDown(digit)}
        onMouseUp={() => handleKeyUp(digit)}
        onTouchStart={() => handleKeyDown(digit)}
        onTouchEnd={() => handleKeyUp(digit)}
        onClick={onClick}
        className={`
          ${keySize} rounded-2xl text-white font-bold
          transition-all duration-100 transform
          shadow-lg relative overflow-hidden
          ${keyTypeClass}
          ${className}
          ${isPressed ? 'scale-95 shadow-md' : 'scale-100 hover:scale-105 active:scale-95'}
          focus:outline-none focus:ring-2 focus:ring-offset-2
        `}
      >
        {/* Ripple effect background */}
        {isPressed && (
          <div className="absolute inset-0 bg-white/30 rounded-2xl animate-ping opacity-75" />
        )}
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
        <span className="relative z-10">{digit}</span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <style>{`
        @keyframes keypadGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0));
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.3));
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

        @keyframes softPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        .animated-keypad {
          animation: slideUp 0.6s ease-out;
        }

        .keypad-container {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          padding: 1.5rem;
        }

        /* Number Keys */
        .key-number {
          background: linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #d946ef 100%);
          position: relative;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .key-number::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-number:hover:not(:active) {
          background: linear-gradient(135deg, #f87171 0%, #f472b6 50%, #e879f9 100%);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .key-number:active {
          box-shadow: 0 2px 5px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Delete Key */
        .key-delete {
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
          position: relative;
          box-shadow: 0 4px 15px rgba(75, 85, 99, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .key-delete::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-delete:hover:not(:active) {
          background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
          box-shadow: 0 8px 25px rgba(75, 85, 99, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        /* Submit Key */
        .key-submit {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          position: relative;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .key-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-submit:hover:not(:active) {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .key-submit:disabled {
          background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
          box-shadow: 0 2px 5px rgba(107, 114, 128, 0.2);
        }

        /* Focus styles for accessibility */
        .key-number:focus-visible {
          outline: 2px solid #f87171;
          outline-offset: 2px;
        }

        .key-delete:focus-visible {
          outline: 2px solid #9ca3af;
          outline-offset: 2px;
        }

        .key-submit:focus-visible {
          outline: 2px solid #34d399;
          outline-offset: 2px;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .keypad-container {
            padding: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-keypad,
          .key-number,
          .key-delete,
          .key-submit {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      {/* Main Keypad Container */}
      <div className="keypad-container">
        {/* Number Grid with staggered animation */}
        <div className="animated-keypad grid grid-cols-3 gap-2 sm:gap-3 mb-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num, index) => (
            <div
              key={num}
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.04}s both`,
              }}
            >
              <KeyButton
                digit={num.toString()}
                onClick={() => handleDigitClick(num.toString())}
                className="w-full group"
                type="number"
              />
            </div>
          ))}
        </div>

        {/* Bottom Row - 0, Delete, Submit */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Zero Key */}
          <div style={{ animation: 'slideUp 0.5s ease-out 0.36s both' }}>
            <KeyButton
              digit="0"
              onClick={() => handleDigitClick('0')}
              className="w-full group"
              type="number"
            />
          </div>

          {/* Delete Button */}
          <div style={{ animation: 'slideUp 0.5s ease-out 0.4s both' }}>
            <button
              onMouseDown={() => handleKeyDown('delete')}
              onMouseUp={() => handleKeyUp('delete')}
              onTouchStart={() => handleKeyDown('delete')}
              onTouchEnd={() => handleKeyUp('delete')}
              onClick={handleDeleteClick}
              className={`
                w-full ${keySize} rounded-2xl key-delete text-white
                transition-all duration-100 transform shadow-lg
                flex items-center justify-center
                ${
                  pressedKeys['delete']
                    ? 'scale-95 shadow-md'
                    : 'scale-100 hover:scale-105 active:scale-95'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2
              `}
              title="Delete (Backspace)"
            >
              <Delete className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
            </button>
          </div>

          {/* Submit Icon Button */}
          <div style={{ animation: 'slideUp 0.5s ease-out 0.44s both' }}>
            <button
              onMouseDown={() => onSubmit && handleKeyDown('submit')}
              onMouseUp={() => onSubmit && handleKeyUp('submit')}
              onTouchStart={() => onSubmit && handleKeyDown('submit')}
              onTouchEnd={() => onSubmit && handleKeyUp('submit')}
              onClick={handleSubmitClick}
              disabled={!onSubmit}
              className={`
                w-full ${keySize} rounded-2xl key-submit text-white
                transition-all duration-100 transform shadow-lg
                flex items-center justify-center gap-2 font-bold
                ${
                  pressedKeys['submit']
                    ? 'scale-95 shadow-md'
                    : 'scale-100 hover:scale-105 active:scale-95'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:cursor-not-allowed
              `}
              title="Submit"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
            </button>
          </div>
        </div>
      </div>

      {/* Large Submit Button (if label provided) */}
      {onSubmit && submitLabel && (
        <button
          onMouseDown={() => handleKeyDown('submitLarge')}
          onMouseUp={() => handleKeyUp('submitLarge')}
          onTouchStart={() => handleKeyDown('submitLarge')}
          onTouchEnd={() => handleKeyUp('submitLarge')}
          onClick={handleSubmitClick}
          style={{ animation: 'slideUp 0.5s ease-out 0.48s both' }}
          className={`
            w-full py-4 px-6 rounded-2xl
            bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
            hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400
            text-white text-lg font-bold
            transition-all duration-100 transform shadow-lg
            relative overflow-hidden
            ${pressedKeys['submitLarge'] ? 'scale-95 shadow-md' : 'scale-100 hover:scale-105 active:scale-95'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400
          `}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          <span className="relative z-10">{submitLabel}</span>
        </button>
      )}
    </div>
  );
}
