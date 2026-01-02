import React from 'react';

const ShareButton = ({ challenge }) => {
    const handleShare = async () => {
        const text = `I found a ${challenge} today! #DailyPurpleCow`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Daily Purple Cow',
                    text: text,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(`${text} ${window.location.href}`);
            alert('Copied to clipboard!');
        }
    };

    return (
        <button className="share-btn" onClick={handleShare}>
            Share Achievement 📤
        </button>
    );
};

export default ShareButton;
