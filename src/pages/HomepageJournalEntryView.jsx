import "../css/pages.css";
import ConfirmationModal from '../components/ConfirmationModal';
import TopBar from "../components/TopBar";
import { entryHeadline, entryDate } from '../firebase/databaseUser'
import { getUserEntryContent, deleteJournalEntry } from '../firebase/databaseHomepage'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageDialogue from "../components/MessageDialogue";

export default function HomepageJournalEntryView() {

    const [content, setContent] = useState('');
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = entryHeadline(inputString);
    var date = entryDate(inputString);
    date = date.slice(0, -1);

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    //Message Dialogue
    const [isMessageOpen, setIsMessageOpen] = useState(false);
 

    const handleConfirm = async () => {
        try {
            await deleteJournalEntry(headline, date);
            setIsModalOpen(false);
            setIsMessageOpen(true);

            // Set timeout to close the Message Dialogue after 3 seconds
            setTimeout(() => {
                setIsMessageOpen(false);
                window.location.href = '/home';
            }, 3000);
        } catch (error) {
            console.error('Error deleting journal entry:', error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }




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
                            <h1>{headline}</h1>
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

                     
                        <button className="deleteEntryButton"
                            onClick={openModal}>&#128465;</button>

                        { /*Handling Delete Confirmation*/}
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            message="Are you sure you want to delete?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                        <MessageDialogue isOpen={isMessageOpen} message="Your Entry is DELETED!" />

                    </div>
                </div>
            </div>
            
            <div className="bottomPageContainer">
            <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
            </>
    );
}
