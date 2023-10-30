import React, { useState } from 'react';
import './userSettings.css';
import ConfirmationModal from './ConfirmationModal';
export default function UserSettings() {

    //Cycle through Avatar images
    const [currentImage, setCurrentImage] = useState(1);
    const handleClick = () => {
        setCurrentImage(currentImage === 4 ? 1 : currentImage + 1);
    };

    //Confirmation Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Message Dialogue
    const [showMessage, setShowMessage] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        //setAvatarImage goes here
        //setUserName goes Here
        
        setIsModalOpen(false);
        //Message Dialgue
        setShowMessage(true);
        //Time Out after 3 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="flex-container">
            <label>Choose an Avatar Image</label>

            <div className="UserImage">
                <img
                    src={`./images/avatarImage${currentImage}.png`}
                    alt="UserImage"
                    onClick={handleClick}
                />
            </div>

            <label>Choose User Name</label>

            <input className="userNameInput" />
            {/* Show confirmation dialogue here*/ }
            {showMessage && (
                <div className="saveConfirmed">Your Entry Has been Saved!</div>
            )}

            <button onClick={openModal}>Submit Changes</button>
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Are you sure you want to Submit?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

         
        </div>
    );
}