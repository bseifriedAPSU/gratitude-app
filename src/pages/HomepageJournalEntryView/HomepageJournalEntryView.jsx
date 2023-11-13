import React, { useState, useEffect } from 'react';
import './homepageJournalEntryView.css';
import TopBar from "../../components/TopBar";
import { entryHeadline, entryDate } from '../../firebase/databaseUser'
import { getUserEntryContent } from '../../firebase/databaseHomepage'
import ConfirmationModal from '../../components/ConfirmationModal';

export default function HomepageJournalEntryView() {

    const [content, setContent] = useState('');
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = entryHeadline(inputString);
    var date = entryDate(inputString);
    date = date.slice(0, -1);

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Message Dialogue
    const [showMessage, setShowMessage] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const handleConfirm = () => {
        //DELETE ENTRY FUNCTION CALL GOES HERE<<<*****************************<<<
        setIsModalOpen(false);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };






    useEffect(() => {
        getUserEntryContent(headline, date)
            .then((data) => {
                setUsername(localStorage.getItem('Username'));
                setContent(data);
            }).catch((error) => {
                console.log(error);
            });
    });

    return (
      <>
            <TopBar />
        <div className="journalEntryView">
            <div className="journalEntryViewContainer">
                <div className="postHeader">
                    <div className="title">
                        <h1>{ headline }</h1>
                    </div>
                </div>
                <div className="postTextContainer">{content}</div>

                <div className="articleBottomContainer">
                    <div className="usernameDisplay">
                    {username ? (
                        <h3>Username: {username}</h3>
                    ) : (
                        <h3>Loading...</h3>
                    )}
                        </div>

                        {/* message confirmation*/ }
                        {showMessage && (
                            <div className="deleteConfirmed">Your Entry Has been Deleted</div>
                        )}
                        <button className="deleteEntryButton"
                            onClick={openModal}>&#128465;</button>

                        { /*Handling Delete Confirmation*/}
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            message="Are you sure you want to delete?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}  
                        />

                        
                </div>
                </div>
            </div>
      </>
    );
}
