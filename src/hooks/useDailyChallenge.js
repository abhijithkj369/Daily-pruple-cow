import { useState, useEffect } from 'react';
import { challenges } from '../data/challenges';

const STORAGE_KEY = 'daily_purple_cow_state';

export function useDailyChallenge() {
    const [challenge, setChallenge] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const today = new Date().toDateString();
        const storedData = localStorage.getItem(STORAGE_KEY);

        let state = {
            date: today,
            challengeIndex: 0,
            completed: false,
            streak: 0,
            lastCompletedDate: null,
            totalFound: 0
        };

        if (storedData) {
            const parsed = JSON.parse(storedData);

            // Check if streak needs to be reset
            // If the last stored date was not yesterday and not today, streak is broken.
            // Actually, we should check lastCompletedDate.

            if (parsed.date === today) {
                state = parsed;
            } else {
                // New day
                const newIndex = Math.floor(Math.random() * challenges.length);

                // Calculate streak
                // If lastCompletedDate was yesterday, keep streak (it will be incremented when they finish today)
                // If lastCompletedDate was before yesterday, reset streak to 0.
                // Wait, usually streak is "current streak". If I haven't done it today, is my streak 0 or N?
                // Usually it shows N, and if I don't do it today, tomorrow it becomes 0.
                // So if I open it today, and I did it yesterday, streak is N.
                // If I didn't do it yesterday, streak is 0.

                let currentStreak = parsed.streak || 0;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                const lastCompleted = parsed.lastCompletedDate ? new Date(parsed.lastCompletedDate).toDateString() : null;

                if (lastCompleted !== yesterday.toDateString()) {
                    currentStreak = 0;
                }

                state = {
                    date: today,
                    challengeIndex: newIndex,
                    completed: false,
                    streak: currentStreak,
                    lastCompletedDate: parsed.lastCompletedDate,
                    totalFound: parsed.totalFound || 0
                };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            }
        } else {
            // First time
            const newIndex = Math.floor(Math.random() * challenges.length);
            state = {
                date: today,
                challengeIndex: newIndex,
                completed: false,
                streak: 0,
                lastCompletedDate: null,
                totalFound: 0
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }

        setChallenge(challenges[state.challengeIndex]);
        setIsCompleted(state.completed);
        setStreak(state.streak);
    }, []);

    const markAsFound = () => {
        const today = new Date().toDateString();
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            const parsed = JSON.parse(storedData);

            // Increment streak only if not already completed today
            let newStreak = parsed.streak || 0;
            if (!parsed.completed) {
                newStreak += 1;
            }

            const newState = {
                ...parsed,
                completed: true,
                streak: newStreak,
                lastCompletedDate: today,
                totalFound: (parsed.totalFound || 0) + 1
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            setIsCompleted(true);
            setStreak(newStreak);
        }
    };

    return { challenge, isCompleted, markAsFound, streak, totalFound: (JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}').totalFound || 0) };
}
