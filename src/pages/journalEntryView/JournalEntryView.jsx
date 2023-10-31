import React from 'react';
import './journalEntryView.css';
import TopBar from "../../components/TopBar";

export default function JournalEntryView() {
    return (
        <><TopBar />
        <div className="journalEntryView">
            <div className="journalEntryViewContainer">
                <div className="postHeader">
                    <div className="title">
                        <h1>Title Goes Here</h1>
                    </div>
                </div>
                <div className="postTextContainer">Content will go here</div>
                <h3>Author Name will go here</h3>
            </div>
            </div>
        </>
    );
}
