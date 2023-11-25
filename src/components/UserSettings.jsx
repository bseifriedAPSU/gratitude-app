import '../css/components.css';
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { createUserAccount, updateUserAccount, usernameCheck, deleteUserAccount } from '../firebase/databaseUser';
import { useNavigate } from 'react-router-dom';
import MessageDialogue from './MessageDialogue';

export default function UserSettings() {
    const isUser = JSON.parse(localStorage.getItem('isUser'));
    const navigate = useNavigate();
    //Username 
    const [currentUsername, setCurrentUsername] = useState("");
    //Cycle through Avatar images
    const [currentImage, setCurrentImage] = useState(1);
    //Set if the username currently exists or not 
    const [userExists, setUserExists] = useState(false);
    //checks for an invalid username 
    const [invalidUser, setInvalidUser] = useState(false);
    //adds a message to alert the user that their account has been successfully deleted 
    const [deletedAccount, setDeletedAccount] = useState(false);

    //handles the changing value for the username 
    const handleUsernameChange = (event) => {
        if (event.target.value !== null) {
            setCurrentUsername(event.target.value);
        }
    };

    //checks if the username meets certain criteria before allowing the user to submit 
    const isUsernameValid = () => {
        // Check for spaces and minimum length
        return currentUsername.length >= 5 && !/\s/.test(currentUsername);
    };


    const handleClick = () => {
        setCurrentImage(currentImage === 4 ? 1 : currentImage + 1);
    };

    //Confirmation Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const openDeleteModal = () => {
        setIsDeleteModalOpen(true);
    }

    // Message Dialogue 
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);



    const createNewUser = async () => {
        try {
            //get the result of the username check to determine if the username already exists or not 
            const exists = await usernameCheck(currentUsername);

            //if the username does not exist create a new user account 
            if (!exists) {
                createUserAccount(currentImage, currentUsername, localStorage.getItem('uid'));

                //DO NOT REMOVE 
                //This sets localStorage for TopBar so user does NOT need to log out to see changes made
                localStorage.setItem('Username', currentUsername);
                localStorage.setItem('UserImage', currentImage);

                setIsModalOpen(false);

                localStorage.setItem('isUser', true);
                localStorage.setItem('isAuth', true);
                navigate("/home");
            }
            //display a message to the user if the account already exists 
            else {
                setUserExists(true);
                setIsModalOpen(false);

                setTimeout(() => {
                    setUserExists(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error checking username:", error);
        }
    };

    //updates the current user's profile picture
    const updateCurrentUser = () => {
        updateUserAccount(currentImage, localStorage.getItem('uid'));
        localStorage.setItem('UserImage', currentImage);

        setIsModalOpen(false);
        setIsMessageOpen(true);
        setTimeout(() => {
            setIsMessageOpen(false);

        }, 3000);
    };

    //handles the user clicking on the confirm button 
    //if the user exists, calls the update, otherwise creates a new user 
    const handleConfirm = () => {
        if (!isUser) {
            if (isUsernameValid()) {
                createNewUser();
            } else {
                setInvalidUser(true);
                setIsModalOpen(false)

                setTimeout(() => {
                    setInvalidUser(false);
                }, 3000);
            }
        } else {
            updateCurrentUser();
        }
    }

    const handleDelete = () => {
        setIsModalOpen(false);
        deleteUserAccount().then(() => { 

        setDeletedAccount(true)

        setTimeout(() => {
            setDeletedAccount(false);
            window.location.href = "/";
        }, 3000);
        })
    }

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
    }
    //closes the modal if the user clicks on the cancel button 
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    return (
        <div className="flex-container">
            <label>Click Picture to Select an Avatar Image</label>

            <div className="UserImage">
                <img
                    src={`./images/avatarImage${currentImage}.png`}
                    alt="UserImage"
                    onClick={handleClick}
                />
            </div>

            {!isUser && (
                <div>
                    <label>Choose User Name </label>
                    <label>(This cannot be changed)</label>

                    <input className="userNameInput"
                        type="text"
                        value={currentUsername}
                        onChange={handleUsernameChange}
                    />
                </div>
            )}

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
            {isUser && (
                <div>
                    <button onClick={openDeleteModal}>Delete Account</button>
                    <ConfirmationModal
                        isOpen={isDeleteModalOpen}
                        message="Are you sure you want to delete your account?"
                        onConfirm={handleDelete}
                        onCancel={handleDeleteCancel}
                    />
                </div>
            )}
            <MessageDialogue isOpen={userExists} message="Username already exists please try again." />
            <MessageDialogue isOpen={isMessageOpen} message="Your Selection has been SAVED!" />
            <MessageDialogue isOpen={invalidUser} message="Invalid username. Username must be at least 5 characters without spaces." />
            <MessageDialogue isOpen={deletedAccount} message="Account Successfully Deleted" />
        </div>
    );
}