import React, { useState } from 'react';

const NoteInput = ({ onSave }) => {
    const [note, setNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(note);
    };

    return (
        <form onSubmit={handleSubmit} className="note-input-form">
            <input
                type="text"
                placeholder="What did you find? (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="note-input"
            />
            <button type="submit" className="save-note-btn">Save Note</button>
        </form>
    );
};

export default NoteInput;
