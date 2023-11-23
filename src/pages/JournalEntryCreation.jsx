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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isLengthShort, setIsLengthShort] = useState(false);
    const [textAreaContent, setTextAreaContent] = useState('');
    const [headlineContent, setHeadlineContent] = useState('');
    const [toggleState, setToggleState] = useState(false);

    const handleToggle = (isChecked) => {
        setToggleState(isChecked);
    };

    const handleTextAreaChange = (event) => {
        setTextAreaContent(event.target.value);
    };

    const handleHeadlineChange = (event) => {
        setHeadlineContent(event.target.value);
    };

    const handleConfirm = () => {
        if (textAreaContent.length >= minLength && headlineContent.length >= minLength) {
            const visibility = toggleState;

            createNewEntry(headlineContent, textAreaContent, visibility);
            setTextAreaContent('');
            setHeadlineContent('');
            setIsModalOpen(false);
            setIsMessageOpen(true);

            setTimeout(() => {
                setIsMessageOpen(false);
                window.location.href = '/home';

                wordCloudList(localStorage.getItem('uid'))
                    .then((data) => {
                        localStorage.setItem('wordCloudList', JSON.stringify(data));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }, 3000);
        } else {
            setIsLengthShort(true);
            setIsModalOpen(false);

            setTimeout(() => {
                setIsLengthShort(false);
            }, 3000);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const minLength = 5;

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
                            minLength={5}
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
                            minLength={5}
                            maxLength={1000}
                        />

                    </div>
                    <div className="journalCreationBottom">
                        <div className="toggleSwitch">
                            <ToggleSwitch onToggle={handleToggle} />
                        </div>


                        <button className="journalEntryCreationButton" onClick={openModal}>Submit Entry</button>

                        <ConfirmationModal
                            isOpen={isModalOpen}
                            message="Are you sure you want to Submit?"
                            onConfirm={handleConfirm}
                            onCancel={handleCancel}
                        />

                        <MessageDialogue isOpen={isMessageOpen} message="Your Entry is SAVED!" />
                        <MessageDialogue isOpen={isLengthShort} message="Title and Entry must have at least 5 characters." />
                    </div>
                </div>
            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>
    );
}
