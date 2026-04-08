export default function LandingPage({ onLetsPlay }) {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      {/* Scan-line overlay */}
      <div className="scanline-overlay"></div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-bg/95 border-b border-neon-cyan/30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/neon-numbers-logo.svg" alt="Neon Numbers" className="w-10 h-10" />
            <div className="text-2xl font-bold neon-heading">Neon Numbers</div>
          </div>
          <button
            onClick={onLetsPlay}
            className="neon-button neon-button-cyan px-6 py-2 rounded-lg font-bold text-sm"
          >
            Let's Play
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 neon-heading">
            My Number Is?
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the ultimate cyberpunk number guessing game. Test your intuition, challenge your friends, and crack impossible codes in a neon-soaked virtual world.
          </p>
          <button
            onClick={onLetsPlay}
            className="neon-button neon-button-cyan px-12 py-4 rounded-full text-lg font-bold"
          >
            🚀 Start Playing Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-neon-cyan">
            Game Modes
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Solo Game Card */}
            <div className="border-2 border-neon-cyan/50 rounded-lg p-6 hover:border-neon-cyan transition-all hover:bg-neon-cyan/5">
              <div className="text-4xl mb-4">▶️</div>
              <h3 className="text-2xl font-bold text-neon-cyan mb-3">Solo Game</h3>
              <p className="text-gray-400 mb-4">
                Challenge yourself with 60 seconds to guess a number between 1-100. Get helpful hints as you narrow down the range.
              </p>
              <div className="text-sm text-neon-pink">
                ⏱️ 60 seconds • 🎯 10 attempts • 📊 Easy to Hard
              </div>
            </div>

            {/* 2 Player Card */}
            <div className="border-2 border-neon-pink/50 rounded-lg p-6 hover:border-neon-pink transition-all hover:bg-neon-pink/5">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-neon-pink mb-3">2 Player Mode</h3>
              <p className="text-gray-400 mb-4">
                Hot-seat gameplay! Player 1 thinks of a number, Player 2 guesses with real-time feedback. Perfect for competitive fun.
              </p>
              <div className="text-sm text-neon-cyan">
                🏁 Unlimited time • 💭 Player 1 sets number • 🤝 Local multiplayer
              </div>
            </div>

            {/* Crack the Code Card */}
            <div className="border-2 border-neon-magenta/50 rounded-lg p-6 hover:border-neon-magenta transition-all hover:bg-neon-magenta/5">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-neon-magenta mb-3">Crack the Code ❤️</h3>
              <p className="text-gray-400 mb-4">
                The ultimate challenge! 45 seconds, only 5 attempts, no hints. Range is 1-50. Can you crack it?
              </p>
              <div className="text-sm text-red-400">
                ⚡ 45 seconds • 🚫 No hints • 💪 Expert difficulty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Highlight */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-neon-cyan">
            Why You'll Love It
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="text-3xl">🌊</div>
              <div>
                <h3 className="text-xl font-bold text-neon-pink mb-2">Cyberpunk Aesthetics</h3>
                <p className="text-gray-400">
                  Experience stunning neon glows, scan-line effects, and immersive animations that transport you to a digital world.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🎯</div>
              <div>
                <h3 className="text-xl font-bold text-neon-cyan mb-2">Strategic Gameplay</h3>
                <p className="text-gray-400">
                  Use logic and intuition to narrow down the range. Every guess gets you closer to victory.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">🏆</div>
              <div>
                <h3 className="text-xl font-bold text-neon-magenta mb-2">Track Your Scores</h3>
                <p className="text-gray-400">
                  Compete with friends! Scores are saved locally, allowing you to compare best times and attempts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="text-xl font-bold text-neon-green mb-2">Play Anywhere</h3>
                <p className="text-gray-400">
                  Fully responsive design works perfectly on mobile, tablet, and desktop. Play on the go!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-black/30 border-t border-neon-cyan/20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-neon-cyan mb-2">3</div>
              <p className="text-gray-400">Unique Game Modes</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-neon-pink mb-2">∞</div>
              <p className="text-gray-400">Endless Replayability</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-neon-magenta mb-2">100%</div>
              <p className="text-gray-400">Free to Play</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-neon-cyan">
            Ready to Enter the Neon World?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Join thousands of players experiencing the ultimate number guessing game.
          </p>
          <button
            onClick={onLetsPlay}
            className="neon-button neon-button-cyan px-12 py-4 rounded-full text-lg font-bold"
          >
            🎮 Let's Play Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700/30 text-center text-gray-600">
        <p>Built with React + Vite + Tailwind CSS | Hosted on Vercel</p>
        <p className="text-sm mt-2">© 2026 Neon Numbers. All rights reserved.</p>
      </footer>
    </div>
  );
}
