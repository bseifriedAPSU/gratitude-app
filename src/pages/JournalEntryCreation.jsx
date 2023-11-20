import "../css/pages.css";
import React, { useState } from 'react';
import { createNewEntry, wordCloudList } from "./../firebase/databaseHomepage";
import ToggleSwitch from "../components/ToggleSwitch";
import JournalPrompts from '../components/JournalPrompts';
import ConfirmationModal from '../components/ConfirmationModal';
import TopBar from "../components/TopBar";
import { useNavigate } from 'react-router-dom';
import MessageDialogue from "../components/MessageDialogue";

export default function JournalEntryCreation() {

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    //Message Dialogue
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const handleConfirm = ( ) => {
        createNewEntry(headlineContent, textAreaContent, visibility);
        setTextAreaContent('');
        setHeadlineContent('');
        // close Confirmation Modal
        setIsModalOpen(false);
        // open Message Dialogue
        setIsMessageOpen(true);
        // Set timeout to close the Message Dialogue after 3 seconds
        setTimeout(() => {
            setIsMessageOpen(false);
            // redirect back to home page after the message is displayed
            window.location.href = '/home';

            wordCloudList(localStorage.getItem('uid'))
                .then((data) => {
                    localStorage.setItem('wordCloudList', JSON.stringify(data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 3000);
    };


  

    // Article Creation
    const [textAreaContent, setTextAreaContent] = useState('');

    const handleTextAreaChange = (event) => {
        setTextAreaContent(event.target.value);
    };

    const [headlineContent, setHeadlineContent] = useState('');

    const handleHeadlineChange = (event) => {
        setHeadlineContent(event.target.value);
    };

    const [toggleState, setToggleState] = useState(false);

    const handleToggle = (isChecked) => {
        setToggleState(isChecked);
    };

    const handleButtonClick = () => {
        if (toggleState) {
            return true;
        } else {
            return false;
        }
    };

    var visibility = handleButtonClick();

    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }


    return (
        <>
        <TopBar />
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
            
                <h1>Create A Journal Entry</h1>
              
                <JournalPrompts />
                <div className="entryInput">
                    <label> Title:</label>
                        <input
                        className="headlineInput"
                        type="text"
                        placeholder="Title..."
                        value={headlineContent}
                        onChange={handleHeadlineChange}
                        maxLength={100}
                    />
                </div>
                <div className="entryInput">
                    <label> Entry:</label>
                        <textarea
                        className="contentInput"
                        placeholder="Entry..."
                        value={textAreaContent}
                        onChange={handleTextAreaChange}
                        maxLength={1000}
                    />
                    </div>
                <div className="journalCreationBottom">
                <div className="toggleSwitch">
                    <ToggleSwitch onToggle={handleToggle}/>
                </div>


                <button className="journalEntryCreationButton" onClick={openModal}>Submit Entry</button>

                <ConfirmationModal
                    isOpen={isModalOpen}
                    message="Are you sure you want to Submit?" 
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                        />
                    
                    <MessageDialogue isOpen={isMessageOpen} message="Your Entry is SAVED!" />
                 
                    </div>
            </div>
            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>
    );
}
