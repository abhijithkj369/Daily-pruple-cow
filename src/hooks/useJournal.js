import { useState, useEffect } from 'react';

const JOURNAL_KEY = 'daily_purple_cow_journal';

export function useJournal() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(JOURNAL_KEY);
        if (stored) {
            setEntries(JSON.parse(stored));
        }
    }, []);

    const addEntry = (challenge, note) => {
        const today = new Date().toDateString();
        const newEntry = {
            id: Date.now(),
            date: today,
            challenge,
            note
        };

        const updatedEntries = [newEntry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem(JOURNAL_KEY, JSON.stringify(updatedEntries));
    };

    return { entries, addEntry };
}
