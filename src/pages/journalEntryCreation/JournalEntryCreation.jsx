import React, { useState } from 'react';
import './journalEntryCreation.css';
import { createNewEntry } from "./../../firebase/database.js";
import ToggleSwitch from "../../components/ToggleSwitch";
import JournalPrompts from '../../components/JournalPrompts';

export default function JournalEntryCreation() {
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
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
            
                <h1>Create A Journal Entry</h1>
                <JournalPrompts />
                <div className="entryInput">
                    <label> Title:</label>
                    <input
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
                        placeholder="Entry..."
                        value={textAreaContent}
                        onChange={handleTextAreaChange}
                        maxLength={1000}
                    />
                </div>
                <div className="toggleSwitch">
                    <ToggleSwitch onToggle={handleToggle}/>
                </div>
                <button onClick={() => createNewEntry(headlineContent, textAreaContent, visibility)}>Submit Post</button>
            </div>
        </div>
    );
}
