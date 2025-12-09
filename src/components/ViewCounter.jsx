import React, { useState, useEffect } from 'react';

const ViewCounter = () => {
    const [views, setViews] = useState(null);

    useEffect(() => {
        // Using counterapi.dev for a simple, no-backend counter
        // Namespace: daily-purple-cow, Key: visits
        const fetchViews = async () => {
            try {
                // First, try to increment
                const response = await fetch('https://api.counterapi.dev/v1/daily-purple-cow/visits/up');
                const data = await response.json();
                if (data && data.count) {
                    setViews(data.count);
                }
            } catch (error) {
                console.error("Error fetching views:", error);
                // Fallback or silent fail
            }
        };

        fetchViews();
    }, []);

    if (views === null) return null;

    return (
        <div className="view-counter">
            <span className="eye-icon">👁️</span>
            <span className="count-text">{views} Purple Cows Spotted</span>
        </div>
    );
};

export default ViewCounter;
