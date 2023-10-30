import React from 'react';
import './messageDialogue.css';

const MessageDialogue = ({ isOpen, message, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="msg-container">
            <div className="msg-background"></div>
            <div className="msg-content">
                <p className="msg-message">{message}</p>
                <div className="msg-buttons">
                    <button className="confirm-button" onClick={onConfirm}>
                       OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageDialogue;