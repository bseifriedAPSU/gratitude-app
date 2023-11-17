import '../css/components.css';

import React from 'react';


const MessageDialogue = ({ isOpen, message, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="msg-container">
            <div className="msg-background"></div>
            <div className="msg-content">
                <p className="msg-message">{message}</p>
            </div>
        </div>
    );
};

export default MessageDialogue;