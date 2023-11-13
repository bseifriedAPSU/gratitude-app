import ConfirmationModal from "./ConfirmationModal";
import "./adminSettings.css";
import React, { useState } from 'react';

export default function UserSettings() {

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
    return (
        <div className="adminContainer">
            {/* message confirmation*/}

            {/* Render list of username and button*/}
            <h3>Username</h3>
            <button className="deleteUserAdminButton" onClick={openModal}>DELETE ACCOUNT</button>



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
    );

};