import ConfirmationModal from "./ConfirmationModal";
import "./adminSettings.css";
import React, { useState, useEffect } from 'react';
import { admin } from '../firebase/databaseUser'

export default function UserSettings() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        admin().then((data) => {
            setIsAdmin(data);
        });
    })
    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Message Dialogue
    const [showMessage, setShowMessage] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const handleConfirm = () => {
        //DELETE USER ACCOUNT FUNCTION CALL GOES HERE         <<<*****************************<<<
        setIsModalOpen(false);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
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
            <h3>Username</h3>
            <button className="deleteUserAdminButton" onClick={openModal}>DELETE ACCOUNT</button>
            </div>


            {showMessage && (
                <div className="accountDeletionConfirmed">Account had been DELETED</div>
            )}
            { /*Handling account deletion Confirmation*/}
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Are you sure you want to DELETE? This action CANNOT be undone."
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            </div>
        )
};