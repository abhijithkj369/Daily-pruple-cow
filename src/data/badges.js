export const badges = [
    {
        id: 'first_cow',
        name: 'First Cow',
        description: 'Found your first Purple Cow!',
        icon: '🐮',
        condition: (stats) => stats.totalFound >= 1
    },
    {
        id: 'streak_3',
        name: 'Hat Trick',
        description: '3-day streak!',
        icon: '🎩',
        condition: (stats) => stats.streak >= 3
    },
    {
        id: 'streak_7',
        name: 'Weekly Warrior',
        description: '7-day streak!',
        icon: '🔥',
        condition: (stats) => stats.streak >= 7
    },
    {
        id: 'total_10',
        name: 'Cow Collector',
        description: 'Found 10 total cows.',
        icon: '🏆',
        condition: (stats) => stats.totalFound >= 10
    },
    {
        id: 'streak_30',
        name: 'Monthly Master',
        description: '30-day streak!',
        icon: '👑',
        condition: (stats) => stats.streak >= 30
    }
];
