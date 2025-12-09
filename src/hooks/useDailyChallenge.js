import { useState, useEffect } from 'react';
import { challenges } from '../data/challenges';

const STORAGE_KEY = 'daily_purple_cow_state';

export function useDailyChallenge() {
    const [challenge, setChallenge] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        const storedData = localStorage.getItem(STORAGE_KEY);

        let state = {
            date: today,
            challengeIndex: 0,
            completed: false
        };

        if (storedData) {
            const parsed = JSON.parse(storedData);
            if (parsed.date === today) {
                state = parsed;
            } else {
                // New day, new challenge
                // Use a simple hash of the date string to pick a consistent random challenge for everyone (or just random for the user)
                // Requirement says: "generate a new challenge if the stored date is different"
                // Let's pick a random one, but ensure it persists for the day.
                const newIndex = Math.floor(Math.random() * challenges.length);
                state = {
                    date: today,
                    challengeIndex: newIndex,
                    completed: false
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
        } else {
            // First time user
            const newIndex = Math.floor(Math.random() * challenges.length);
            state = {
                date: today,
                challengeIndex: newIndex,
                completed: false
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }

        setChallenge(challenges[state.challengeIndex]);
        setIsCompleted(state.completed);
    }, []);

    const markAsFound = () => {
        const today = new Date().toDateString();
        // We need to get the current index to save it correctly
        // But we can just read from state if we trust it hasn't changed, or re-read from storage.
        // Better to re-read to be safe, or just update the completed flag.
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);
            const newState = { ...parsed, completed: true };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            setIsCompleted(true);
        }
    };

    return { challenge, isCompleted, markAsFound };
}
