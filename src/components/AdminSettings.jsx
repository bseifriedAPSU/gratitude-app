import '../css/components.css';
import ConfirmationModal from "./ConfirmationModal";
import MessageDialogue from './MessageDialogue';
import React, { useState, useEffect } from 'react';
import { admin, adminAccountDelete, displayAccountUsernames } from '../firebase/databaseUser'
import { userAccountCommunityDelete } from '../firebase/databaseCommunity'

export default function UserSettings() {
    //sets the user to admin by default 
    const [isAdmin, setIsAdmin] = useState(false);
    //creates an empty array for the list of usernames 
    const [usernames, setUsernames] = useState([]);
    //sets the selected username for the admin account delete to null by default 
    const [selectedUsername, setSelectedUsername] = useState(null);

    //calls the admin function and updates the value of admin to check if they are an admin or not 
    useEffect(() => {
        admin().then((data) => {
            setIsAdmin(data);
        });

        //displays the list of usernames under the admin settings 
        displayAccountUsernames().then((data) => {
            setUsernames(data);
            console.log(data);
        })
    }, [])

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = (username) => {
        setSelectedUsername(username);
        setIsModalOpen(true);
    };
    // Message Dialogue 
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    //deletes the user account through the admin delete component 
    const handleConfirm = async () => {
        if (selectedUsername) {
            await userAccountCommunityDelete(selectedUsername);
            await adminAccountDelete(selectedUsername);
            setIsModalOpen(false);
            setIsMessageOpen(true);
            setTimeout(() => {
                setIsMessageOpen(false);

            }, 3000);
          window.location.href = "/home";
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return isAdmin && (
        <div className="adminContainer">
       <hr />
            <h2>ADMIN ONLY</h2>
            <div className="accountListContainer">
                <ul>
                    {usernames.map((username, index) => (
                        <li className="accountName"
                            key={index}>
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

           
            {/* Handling account deletion Confirmation*/}
            <ConfirmationModal
                isOpen={isModalOpen}
                message={`Are you sure you want to DELETE ${selectedUsername}'s account? This action CANNOT be undone.`}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            <MessageDialogue isOpen={isMessageOpen} message="The Account has been DELETED" />
        </div>
    )
};