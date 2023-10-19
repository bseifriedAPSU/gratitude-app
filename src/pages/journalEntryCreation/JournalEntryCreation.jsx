import React from 'react';
import './journalEntryCreation.css';
import { createNewEntry } from "./../../firebase/database.js";
import ToggleSwitch from "../../components/ToggleSwitch";

export default function JournalEntryCreation() {
    return (
        <div className="journalEntryCreation">
            <div className="journalEntryContainer">
                <h1>Create A Journal Entry</h1>
                <div className="entryInput">
                    <label> Title:</label>
                    <input
                        type="text"
                        placeholder="Title..."
                    />
                </div>
                <div className="entryInput">
                    <label> Entry:</label>
                    <textarea
                        placeholder="Entry..."
                    />
                </div>
                <button onClick={createNewEntry("jscott72", "Headline", "Content", true)}>Submit Post</button>
                <div className="toggleSwitch">
                    <ToggleSwitch />
                </div>
            </div>
        </div>
    );
}
