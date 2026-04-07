// Game state and logic helpers
export const generateSecretNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getGameDifficulty = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { min: 1, max: 50, attempts: 10, timer: 120 };
    case 'medium':
      return { min: 1, max: 100, attempts: 10, timer: 60 };
    case 'hard':
      return { min: 1, max: 1000, attempts: 8, timer: 90 };
    case 'custom':
      return { min: 1, max: 100, attempts: 10, timer: 60 };
    default:
      return { min: 1, max: 100, attempts: 10, timer: 60 };
  }
};

export const getFeedback = (guess, secretNumber, previousGuesses) => {
  if (guess === secretNumber) {
    return { type: 'correct', message: '🎉 Correct!' };
  }

  if (guess < secretNumber) {
    return { type: 'higher', message: '📈 Too low! Try higher' };
  }

  if (guess > secretNumber) {
    return { type: 'lower', message: '📉 Too high! Try lower' };
  }
};

export const saveScore = (mode, difficulty, attempts, timeUsed) => {
  const scores = JSON.parse(localStorage.getItem('neonGameScores') || '[]');

  const newScore = {
    id: Date.now(),
    mode,
    difficulty,
    attempts,
    timeUsed,
    date: new Date().toISOString()
  };

  scores.push(newScore);
  localStorage.setItem('neonGameScores', JSON.stringify(scores));

  return newScore;
};

export const getHighScores = () => {
  return JSON.parse(localStorage.getItem('neonGameScores') || '[]')
    .sort((a, b) => a.attempts - b.attempts)
    .slice(0, 10);
};
