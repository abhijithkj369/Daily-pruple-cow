
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Analytics } from '@vercel/analytics/react';
import { useDailyChallenge } from './hooks/useDailyChallenge';
import { useJournal } from './hooks/useJournal';
import ViewCounter from './components/ViewCounter';
import StreakCounter from './components/StreakCounter';
import JournalModal from './components/JournalModal';
import NoteInput from './components/NoteInput';
import ShareButton from './components/ShareButton';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const { challenge, isCompleted, markAsFound, streak } = useDailyChallenge();
  const { entries, addEntry } = useJournal();
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [showNoteInput, setShowNoteInput] = useState(false);

  const handleFoundIt = () => {
    markAsFound();
    triggerConfetti();
    setShowNoteInput(true);
  };

  const handleSaveNote = (note) => {
    addEntry(challenge, note);
    setShowNoteInput(false);
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
      <ThemeToggle />
      <div className="glass-card">
        <div className="header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '1rem' }}>
          <h1 className="title" style={{ margin: 0 }}>Daily Purple Cow</h1>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="icon-btn" onClick={() => setIsJournalOpen(true)} title="History">📔</button>
            <StreakCounter streak={streak} />
          </div>
        </div>
        <p className="subtitle">Find your daily remarkable thing.</p>

        <div className="challenge-container">
          <h2 className="challenge-text">{challenge}</h2>
        </div>

        <div className="action-area">
          {isCompleted ? (
            <div className="success-message">
              <p>Great eye! Come back tomorrow.</p>
              {showNoteInput && <NoteInput onSave={handleSaveNote} />}
              <div style={{ marginTop: '15px' }}>
                <ShareButton challenge={challenge} />
              </div>
            </div>
          ) : (
            <button className="found-btn" onClick={handleFoundIt}>
              I Found It!
            </button>
          )}
        </div>
      </div>
      <ViewCounter />
      <Analytics />
      <JournalModal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} entries={entries} />
    </div>
  );
}

export default App;

