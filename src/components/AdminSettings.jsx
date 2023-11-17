import ConfirmationModal from "./ConfirmationModal";
import "./adminSettings.css";
import React, { useState, useEffect } from 'react';
import { admin, deleteUserAccount, displayAccountUsernames } from '../firebase/databaseUser'

export default function UserSettings() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [usernames, setUsernames] = useState([]);
    const [selectedUsername, setSelectedUsername] = useState(null);

    useEffect(() => {
        admin().then((data) => {
            setIsAdmin(data);
        });

        displayAccountUsernames().then((data) => {
            setUsernames(data);
            console.log(data);
        })
    }, [])

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Message Dialogue
    const [showMessage, setShowMessage] = useState(false);

    const openModal = (username) => {
        setSelectedUsername(username);
        setIsModalOpen(true);
    };
    const handleConfirm = () => {
        if (selectedUsername) {
            deleteUserAccount(selectedUsername);
            setIsModalOpen(false);
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };



    ///Here 
    return isAdmin && (
        <div className="adminContainer">
            <h2>ADMIN ONLY</h2>
            {/* Render list of username and button*/}
            <div className="accountListContainer">
                <h3>Usernames:</h3>
                <ul>
                    {usernames.map((username, index) => (
                        <li key={index}>
                            {username}
                            <button
                                className="deleteUserAdminButton"
                                onClick={() => openModal(username)}
                            >
                                DELETE ACCOUNT
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {showMessage && (
                <div className="accountDeletionConfirmed">
                    Account has been DELETED
                </div>
            )}
            {/* Handling account deletion Confirmation*/}
            <ConfirmationModal
                isOpen={isModalOpen}
                message={`Are you sure you want to DELETE ${selectedUsername}'s account? This action CANNOT be undone.`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
    )
};