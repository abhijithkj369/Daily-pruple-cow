import { useState, useEffect } from 'react';
import { badges } from '../data/badges';

export function useBadges(streak, totalFound) {
    const [unlockedBadges, setUnlockedBadges] = useState([]);

    useEffect(() => {
        const stats = { streak, totalFound };
        const unlocked = badges.filter(badge => badge.condition(stats));
        setUnlockedBadges(unlocked.map(b => b.id));
    }, [streak, totalFound]);

    return { badges, unlockedBadges };
}
