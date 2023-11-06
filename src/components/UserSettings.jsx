import React, { useState } from 'react';
import './userSettings.css';
import ConfirmationModal from './ConfirmationModal';
import { createUserAccount, updateUserAccount } from '../firebase/databaseUser';
import { useNavigate } from 'react-router-dom';


export default function UserSettings() {
    const isUser = localStorage.getItem('isUser');
    const navigate = useNavigate();
    //Username 
    const [currentUsername, setCurrentUsername] = useState("");
    //Cycle through Avatar images
    const [currentImage, setCurrentImage] = useState(1);

    const handleUsernameChange = (event) => {
        setCurrentUsername(event.target.value);
    };
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


    const createNewUser = () => {

        createUserAccount(currentImage, currentUsername, localStorage.getItem('uid'));
        //DO NOT REMOVE 
        //This sets localStorage for TopBar so user does NOT need to log out to see changes made
        localStorage.setItem('Username', currentUsername);
        localStorage.setItem('UserImage', currentImage);

        setIsModalOpen(false);
        //Message Dialogue
        setShowMessage(true);
        //Time Out after 3 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        navigate("/home");


    };

    const updateCurrentUser = () => {
        updateUserAccount(currentImage, localStorage.getItem('uid'));

        localStorage.setItem('UserImage', currentImage);

        setIsModalOpen(false);
        //Message Dialogue
        setShowMessage(true);
        //Time Out after 3 seconds 
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        navigate("/home");
    }

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

            <input className="userNameInput"
                type="text"
                value={currentUsername}
                onChange={handleUsernameChange}
            />

            {showMessage && (
                <div className="saveConfirmed">Your Entry Has been Saved!</div>
            )}
            <button onClick={openModal}>Submit Changes</button>
            {!isUser ? (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to Submit?"
                    onConfirm={createNewUser}
                    onCancel={handleCancel}
                />
            ) : (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to Submit?"
                    onConfirm={updateCurrentUser}
                    onCancel={handleCancel}
                />
            )}


        </div>
    );
}