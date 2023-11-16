import React, { useState } from 'react';
import './journalEntryCreation.css';
import { createNewEntry, wordCloudList } from "./../../firebase/databaseHomepage";
import ToggleSwitch from "../../components/ToggleSwitch";
import JournalPrompts from '../../components/JournalPrompts';
import ConfirmationModal from '../../components/ConfirmationModal';
import TopBar from "../../components/TopBar";
export default function JournalEntryCreation() {

    //Confirmation Modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    //Message Dialogue
    const [showMessage, setShowMessage] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleConfirm = () => {
        createNewEntry(headlineContent, textAreaContent, visibility);
        setTextAreaContent('');
        setHeadlineContent('');
        setIsModalOpen(false);
        //Message Dialgue
        setShowMessage(true);
        //Time Out after 3 seconds
        setTimeout(() => {
            setShowMessage(false);
        }, 3000);

        wordCloudList(localStorage.getItem('uid'))
            .then((data) => {
                localStorage.setItem('wordCloudList', JSON.stringify(data));
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleCancel = () => { 
        setIsModalOpen(false);
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
                
                {showMessage && (
                    <div className="saveConfirmed">Your Entry Has been Saved!</div>
                )}
                    </div>
            </div>
            </div>
        </>
    );
}
