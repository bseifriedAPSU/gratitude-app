import '../css/components.css';

import React from 'react';


const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-container">
            <div className="modal-background"></div>
            <div className="modal-content">
                <p className="modal-message">{message}</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
