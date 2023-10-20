import "./journalEntryCreation.css";
import { createNewEntry } from "./../../firebase/database.js";
import ToggleSwitch from "../../components/ToggleSwitch";
import React, { useState } from 'react';

export default function JournalEntryCreation() {
    const [textAreaContent, setTextAreaContent] = useState('');

    const handleTextAreaChange = (event) => {
        setTextAreaContent(event.target.value);
    };

    const [headlineContent, setHeadlineContent] = useState('');

    const handleHeadlineChange = (event) => {
        setHeadlineContent(event.target.value);
    };

    const [toggleValue, setToggleValue] = useState(false);

    const handleToggleChange = (event) => {
        setToggleValue(event.target.checked);
    };

    return (
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
                <h1>Create A Journal Entry</h1>
                <div className="entryInput">
                    <label> Title:</label>
                    <input
                        placeholder="Title..."
                        value={headlineContent}
                        onChange={handleHeadlineChange}
                    /> 
                </div>
                <div className="entryInput">
                    <label> Entry:</label>
                    <textarea
                        placeholder="Entry..."
                        value={textAreaContent}
                        onChange={handleTextAreaChange}
                    />
                </div>
                <button onClick={() => createNewEntry(headlineContent, textAreaContent, toggleValue)}>Submit Post</button>
                <div classname="toggleSwitch">
                    <ToggleSwitch
                        value={toggleValue}
                        onChange={handleToggleChange}
                    />
                </div>
            </div>
        </div>

    )
}

       
   