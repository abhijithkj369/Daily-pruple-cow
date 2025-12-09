import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useDailyChallenge } from './hooks/useDailyChallenge';

function App() {
  const { challenge, isCompleted, markAsFound } = useDailyChallenge();

  const handleFoundIt = () => {
    markAsFound();
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  useEffect(() => {
    if (isCompleted) {
      // Optional: trigger a small burst on load if already completed? 
      // Maybe not, might be annoying on refresh.
    }
  }, [isCompleted]);

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1 className="title">Daily Purple Cow</h1>
        <p className="subtitle">Find your daily remarkable thing.</p>

        <div className="challenge-container">
          <h2 className="challenge-text">{challenge}</h2>
        </div>

        <div className="action-area">
          {isCompleted ? (
            <div className="success-message">
              <p>Great eye! Come back tomorrow.</p>
            </div>
          ) : (
            <button className="found-btn" onClick={handleFoundIt}>
              I Found It!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
