import "../css/pages.css";
import React, { useState, useEffect } from 'react';
import TopBar from "../components/TopBar";
import { displayCommunityEntryContent, increaseFlagCounter, flaggedUserList, checkExclusionList, getFlagCount } from '../firebase/databaseCommunity'
import { getUsernameFromString, entryDate, getCommunityHeadline } from '../firebase/databaseUser'
import { deleteFromCommunity } from '../firebase/databaseHomepage'
import ConfirmationModal from '../components/ConfirmationModal';
import MessageDialogue from "../components/MessageDialogue";
import { useNavigate } from 'react-router-dom';

export default function CommunityJournalEntryView() {

    const [content, setContent] = useState(null);
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = getCommunityHeadline(inputString);
    var date = entryDate(inputString);
    date = date.slice(0, -1);

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const [hasUserFlagged, setHasUserFlagged] = useState(false);
    const openFlagModal = () => {
        setHasUserFlagged(true);
    }

    //Message Dialogue
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [isUserExcluded, setIsUserExcluded] = useState(false);


    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const handleConfirm = async () => {
        try {
            const username = localStorage.getItem('flagUsername');
            const userExcluded = await checkExclusionList(headline, date, username);
            console.log('user excluded', userExcluded);
            setIsUserExcluded(userExcluded);

            if (!userExcluded) {
                // User is not on the exclusion list, proceed with the actions
                await increaseFlagCounter(headline, date, username);
                await flaggedUserList(headline, date, username);
                const flagCount = parseInt(await getFlagCount(headline, date, username));

                if (flagCount >= 5) {
                    console.log('headline', headline, 'date', date, 'username', username)
                    deleteFromCommunity(headline, username, date).then(() => {
                        window.location.href = '/community';
                    });
                }

            } else {
                setHasUserFlagged(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }

        setIsModalOpen(false);
        setIsMessageOpen(true);

        setTimeout(() => {
            setIsMessageOpen(false);
            setHasUserFlagged(false); // Reset the state after displaying the message
        }, 3000);
    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        displayCommunityEntryContent(headline, date)
            .then(data => {
                setUsername(getUsernameFromString(inputString));
                setContent(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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

                        {/* Conditionally render different messages based on isUserExcluded */}
                        {hasUserFlagged ? (
                            <MessageDialogue isOpen={true} message="You have already flagged this post." />
                        ) : (
                            <>
                                <button className="hideEntryButton" onClick={openModal}>&#9873;</button>
                                {/* Display a different message based on isUserExcluded */}
                                <MessageDialogue isOpen={isMessageOpen} message={isUserExcluded ? "This Article has been FLAGGED!" : "You have already flagged this post."} />
                            </>
                        )}
                        { /*Handling Flag Confirmation*/}
                        <ConfirmationModal
                            isOpen={isModalOpen}
                            message="Are you sure you want to FLAG?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />
                        <MessageDialogue isOpen={isMessageOpen} message="This Article has been FLAGGED!" />
                        <MessageDialogue isOpen={hasUserFlagged} message="You have already flagged this post." />
                    </div>

                </div>

            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>
    );
}
