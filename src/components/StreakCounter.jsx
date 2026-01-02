import React from 'react';

const StreakCounter = ({ streak }) => {
    if (streak === 0) return null;

    return (
        <div className="streak-counter" title="Current Streak">
            <span className="fire-icon">🔥</span>
            <span className="streak-count">{streak}</span>
        </div>
    );
};

export default StreakCounter;
