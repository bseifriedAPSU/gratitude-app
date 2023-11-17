import "../css/pages.css";
import React, { useState, useEffect } from 'react';
import TopBar from "../components/TopBar";
import { displayCommunityEntryContent } from '../firebase/databaseCommunity'
import { getUsernameFromString, entryDate, getCommunityHeadline } from '../firebase/databaseUser'
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router-dom';

export default function CommunityJournalEntryView() {

    const [content, setContent] = useState('');
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = getCommunityHeadline(inputString);
    console.log(headline);
    var date = entryDate(inputString);
    date = date.slice(0, -1);
    console.log(date);

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Message Dialogue
    const [showMessage, setShowMessage] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const handleConfirm = () => {
        //FLAG ENTRY FUNCTION CALL GOES HERE         <<<*****************************<<<


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
        displayCommunityEntryContent(headline, date)
            .then((data) => {
                setUsername(getUsernameFromString(inputString));
                setContent(data);
            }).catch((error) => {
                console.log(error);
            });
    });

    return (
        <><TopBar />
            <div className="journalEntryView">
                <div className="journalEntryViewContainer">
                    <div className="postHeader">
                        <div className="title">
                            <h1>{headline}</h1>
                        </div>
                    </div>
                    <div className="postTextContainer">{content}</div>
                    <div className="articleBottomContainer">
                        {username ? (
                            <h3>Username: {username}</h3>
                        ) : (
                            <h3>Loading...</h3>
                        )}

                        {/* message confirmation*/}
                        {showMessage && (
                            <div className="flagConfirmed">Your Entry Has been FLAGGED</div>
                        )}
                        <button className="hideEntryButton" onClick={openModal}>&#9873;</button>
                        { /*Handling Flag Confirmation*/}
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            message="Are you sure you want to FLAG?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                     
                    </div>
                  
                </div>
                
            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>
    );
}
