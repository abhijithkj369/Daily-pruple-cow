import React from 'react';
import { useBadges } from '../hooks/useBadges';

const BadgesDisplay = ({ streak, totalFound }) => {
    const { badges, unlockedBadges } = useBadges(streak, totalFound);

    return (
        <div className="badges-container" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '15px' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem' }}>Achievements</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px' }}>
                {badges.map(badge => {
                    const isUnlocked = unlockedBadges.includes(badge.id);
                    return (
                        <div
                            key={badge.id}
                            title={isUnlocked ? badge.name : badge.description}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                opacity: isUnlocked ? 1 : 0.4,
                                filter: isUnlocked ? 'none' : 'grayscale(100%)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{ fontSize: '2rem', marginBottom: '5px' }}>{badge.icon}</div>
                            <span style={{ fontSize: '0.7rem', textAlign: 'center' }}>{badge.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BadgesDisplay;
