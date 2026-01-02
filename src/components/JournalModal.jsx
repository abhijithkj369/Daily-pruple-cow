import React from 'react';

const JournalModal = ({ isOpen, onClose, entries }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Past Cows 📔</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="journal-list">
                    {entries.length === 0 ? (
                        <p className="empty-journal">No discoveries yet. Go find something!</p>
                    ) : (
                        entries.map(entry => (
                            <div key={entry.id} className="journal-entry">
                                <div className="entry-date">{entry.date}</div>
                                <div className="entry-challenge">Challenge: {entry.challenge}</div>
                                {entry.note && <div className="entry-note">"{entry.note}"</div>}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default JournalModal;
