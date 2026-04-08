/**
 * Generate feedback for a guess against the secret code
 * Returns natural language feedback like "The first one is correct"
 */
export function generateFeedback(guess: string, secretCode: string): string {
  const correctPositions: number[] = [];
  const correctDigits: number[] = [];

  // First pass: find correct positions
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secretCode[i]) {
      correctPositions.push(i);
    }
  }

  // Second pass: find correct digits in wrong positions
  for (let i = 0; i < 4; i++) {
    if (guess[i] !== secretCode[i] && secretCode.includes(guess[i])) {
      correctDigits.push(i);
    }
  }

  // If all correct
  if (correctPositions.length === 4) {
    return "🎯 YOU GOT IT! All digits are correct!";
  }

  // If none correct
  if (correctPositions.length === 0 && correctDigits.length === 0) {
    return "❌ None of these digits are in the code.";
  }

  // Build feedback message
  let feedback = '';

  if (correctPositions.length > 0) {
    const positionTexts = correctPositions.map((pos) => {
      const ordinals = ['first', 'second', 'third', 'fourth'];
      return ordinals[pos];
    });

    if (correctPositions.length === 1) {
      feedback += `✅ The ${positionTexts[0]} one is correct. `;
    } else if (correctPositions.length === 2) {
      feedback += `✅ The ${positionTexts[0]} and ${positionTexts[1]} are correct. `;
    } else if (correctPositions.length === 3) {
      feedback += `✅ The ${positionTexts.slice(0, -1).join(', ')}, and ${positionTexts[2]} are correct. `;
    }
  }

  if (correctDigits.length > 0) {
    if (correctDigits.length === 1) {
      feedback += `🔄 One correct digit is in the wrong position.`;
    } else {
      feedback += `🔄 ${correctDigits.length} correct digits are in the wrong positions.`;
    }
  } else if (correctPositions.length > 0) {
    feedback = feedback.trim();
  }

  return feedback.trim() || "❌ No correct digits.";
}

/**
 * Get a funny couple-style reaction message
 */
export function getReactionMessage(): string {
  const reactions = [
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
  return reactions[Math.floor(Math.random() * reactions.length)];
}
