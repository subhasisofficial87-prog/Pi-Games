import React, { useState } from 'react';
import { Delete, Send, Space } from 'lucide-react';

interface LetterPadProps {
  onChar: (char: string) => void;
  onDelete: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  maxLength?: number;
  currentLength?: number;
}

interface KeyState {
  [key: string]: boolean;
}

export default function LetterPad({
  onChar,
  onDelete,
  onSubmit,
  submitLabel = 'Submit',
  maxLength = 50,
  currentLength = 0,
}: LetterPadProps) {
  const [pressedKeys, setPressedKeys] = useState<KeyState>({});
  const [isShiftActive, setIsShiftActive] = useState(false);

  const handleKeyDown = (key: string) => {
    setPressedKeys((prev) => ({ ...prev, [key]: true }));
  };

  const handleKeyUp = (key: string) => {
    setPressedKeys((prev) => ({ ...prev, [key]: false }));
  };

  const handleCharClick = (char: string) => {
    if (currentLength < maxLength) {
      handleKeyDown(char);
      onChar(isShiftActive ? char.toUpperCase() : char.toLowerCase());
      setTimeout(() => handleKeyUp(char), 150);
      setIsShiftActive(false);
    }
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

  const toggleShift = () => {
    setIsShiftActive(!isShiftActive);
  };

  const handleSpaceClick = () => {
    if (currentLength < maxLength) {
      handleKeyDown('space');
      onChar(' ');
      setTimeout(() => handleKeyUp('space'), 150);
      setIsShiftActive(false);
    }
  };

  // QWERTY keyboard layout
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const KeyButton = ({
    char,
    onClick,
    type = 'letter',
  }: {
    char: string;
    onClick: () => void;
    type?: 'letter' | 'shift' | 'delete' | 'submit' | 'space';
  }) => {
    const isPressed = pressedKeys[char];
    const displayChar = isShiftActive && type === 'letter' ? char.toUpperCase() : char.toLowerCase();

    let keyTypeClass = 'key-letter';
    if (type === 'shift') keyTypeClass = 'key-shift';
    if (type === 'delete') keyTypeClass = 'key-delete';
    if (type === 'submit') keyTypeClass = 'key-submit';
    if (type === 'space') keyTypeClass = 'key-space';

    return (
      <button
        onMouseDown={() => handleKeyDown(char)}
        onMouseUp={() => handleKeyUp(char)}
        onTouchStart={() => handleKeyDown(char)}
        onTouchEnd={() => handleKeyUp(char)}
        onClick={onClick}
        className={`
          py-3 px-2 sm:py-4 sm:px-3 rounded-xl text-white text-sm sm:text-base font-bold
          transition-all duration-100 transform
          shadow-lg relative overflow-hidden
          ${keyTypeClass}
          ${isPressed ? 'scale-95 shadow-md' : 'scale-100 hover:scale-110 active:scale-95'}
          focus:outline-none
          ${type === 'shift' && isShiftActive ? 'ring-2 ring-yellow-400' : ''}
        `}
      >
        {/* Ripple effect */}
        {isPressed && (
          <div className="absolute inset-0 bg-white/30 rounded-xl animate-ping opacity-75" />
        )}
        <span className="relative z-10 block min-h-6 flex items-center justify-center">{displayChar}</span>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <style>{`
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

        .letter-keypad-container {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1.5rem;
          padding: 1.25rem;
        }

        .animated-letter-keypad {
          animation: slideUp 0.6s ease-out;
        }

        /* Letter Keys */
        .key-letter {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          position: relative;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .key-letter::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-letter:hover:not(:active) {
          background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Shift Key */
        .key-shift {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          position: relative;
          box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .key-shift::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-shift:hover:not(:active) {
          background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
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
          border-radius: 0.75rem;
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
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-submit:hover:not(:active) {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Space Key */
        .key-space {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          position: relative;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .key-space::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
          pointer-events: none;
        }

        .key-space:hover:not(:active) {
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 100%);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .letter-keypad-container {
            padding: 0.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-letter-keypad,
          .key-letter,
          .key-shift,
          .key-delete,
          .key-submit,
          .key-space {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      {/* Character count indicator */}
      {maxLength && (
        <div className="text-center text-sm text-gray-400">
          {currentLength} / {maxLength}
        </div>
      )}

      {/* Main Keypad Container */}
      <div className="letter-keypad-container animated-letter-keypad">
        {/* Row 1: Q-P */}
        <div className="grid grid-cols-10 gap-1 sm:gap-2 mb-2">
          {rows[0].map((char, index) => (
            <div
              key={char}
              style={{
                animation: `slideUp 0.4s ease-out ${index * 0.03}s both`,
              }}
            >
              <KeyButton char={char} onClick={() => handleCharClick(char)} type="letter" />
            </div>
          ))}
        </div>

        {/* Row 2: A-L */}
        <div className="grid grid-cols-9 gap-1 sm:gap-2 mb-2">
          <div style={{ animation: `slideUp 0.4s ease-out 0.3s both` }}>
            <button
              onMouseDown={() => handleKeyDown('shift')}
              onMouseUp={() => handleKeyUp('shift')}
              onTouchStart={() => handleKeyDown('shift')}
              onTouchEnd={() => handleKeyUp('shift')}
              onClick={toggleShift}
              className={`
                w-full py-3 sm:py-4 px-2 sm:px-3 rounded-xl key-shift text-white text-xs font-bold
                transition-all duration-100 transform shadow-lg
                flex items-center justify-center
                ${pressedKeys['shift'] ? 'scale-95 shadow-md' : 'scale-100 hover:scale-110 active:scale-95'}
                ${isShiftActive ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900' : ''}
                focus:outline-none
              `}
              title="Shift (Uppercase)"
            >
              <span className="relative z-10">⬆</span>
            </button>
          </div>

          {rows[1].map((char, index) => (
            <div
              key={char}
              style={{
                animation: `slideUp 0.4s ease-out ${0.3 + (index + 1) * 0.03}s both`,
              }}
            >
              <KeyButton char={char} onClick={() => handleCharClick(char)} type="letter" />
            </div>
          ))}
        </div>

        {/* Row 3: Z-M + Delete */}
        <div className="grid grid-cols-8 gap-1 sm:gap-2 mb-3">
          {rows[2].map((char, index) => (
            <div
              key={char}
              style={{
                animation: `slideUp 0.4s ease-out ${0.6 + index * 0.03}s both`,
              }}
            >
              <KeyButton char={char} onClick={() => handleCharClick(char)} type="letter" />
            </div>
          ))}

          <div style={{ animation: `slideUp 0.4s ease-out 0.81s both` }}>
            <button
              onMouseDown={() => handleKeyDown('delete')}
              onMouseUp={() => handleKeyUp('delete')}
              onTouchStart={() => handleKeyDown('delete')}
              onTouchEnd={() => handleKeyUp('delete')}
              onClick={handleDeleteClick}
              className={`
                w-full py-3 sm:py-4 px-2 sm:px-3 rounded-xl key-delete text-white
                transition-all duration-100 transform shadow-lg
                flex items-center justify-center
                ${pressedKeys['delete'] ? 'scale-95 shadow-md' : 'scale-100 hover:scale-110 active:scale-95'}
                focus:outline-none
              `}
              title="Delete"
            >
              <Delete className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            </button>
          </div>
        </div>

        {/* Space and Submit Row */}
        <div className="grid grid-cols-4 gap-1 sm:gap-2">
          {/* Space Key - spans 2 columns */}
          <div
            className="col-span-2"
            style={{
              animation: `slideUp 0.4s ease-out 0.9s both`,
            }}
          >
            <button
              onMouseDown={() => handleKeyDown('space')}
              onMouseUp={() => handleKeyUp('space')}
              onTouchStart={() => handleKeyDown('space')}
              onTouchEnd={() => handleKeyUp('space')}
              onClick={handleSpaceClick}
              disabled={currentLength >= maxLength}
              className={`
                w-full py-3 sm:py-4 px-2 sm:px-3 rounded-xl key-space text-white text-xs font-bold
                transition-all duration-100 transform shadow-lg
                flex items-center justify-center gap-2
                ${pressedKeys['space'] ? 'scale-95 shadow-md' : 'scale-100 hover:scale-110 active:scale-95'}
                focus:outline-none
                ${currentLength >= maxLength ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              title="Space"
            >
              <Space className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline">Space</span>
            </button>
          </div>

          {/* Submit Button - spans 2 columns */}
          <div
            className="col-span-2"
            style={{
              animation: `slideUp 0.4s ease-out 0.95s both`,
            }}
          >
            <button
              onMouseDown={() => onSubmit && handleKeyDown('submit')}
              onMouseUp={() => onSubmit && handleKeyUp('submit')}
              onTouchStart={() => onSubmit && handleKeyDown('submit')}
              onTouchEnd={() => onSubmit && handleKeyUp('submit')}
              onClick={handleSubmitClick}
              disabled={!onSubmit}
              className={`
                w-full py-3 sm:py-4 px-2 sm:px-3 rounded-xl key-submit text-white text-xs sm:text-sm font-bold
                transition-all duration-100 transform shadow-lg
                flex items-center justify-center gap-1
                ${pressedKeys['submit'] ? 'scale-95 shadow-md' : 'scale-100 hover:scale-110 active:scale-95'}
                focus:outline-none
                disabled:cursor-not-allowed disabled:opacity-50
              `}
              title="Submit"
            >
              <Send className="w-4 h-4 relative z-10" />
              <span className="hidden sm:inline text-xs">OK</span>
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
          style={{ animation: 'slideUp 0.4s ease-out 1s both' }}
          className={`
            w-full py-4 px-6 rounded-xl
            bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
            hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400
            text-white text-lg font-bold
            transition-all duration-100 transform shadow-lg
            relative overflow-hidden
            ${pressedKeys['submitLarge'] ? 'scale-95 shadow-md' : 'scale-100 hover:scale-105 active:scale-95'}
            focus:outline-none
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          <span className="relative z-10">{submitLabel}</span>
        </button>
      )}
    </div>
  );
}
