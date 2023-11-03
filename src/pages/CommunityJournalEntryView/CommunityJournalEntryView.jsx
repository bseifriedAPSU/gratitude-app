import React, { useState, useEffect } from 'react';
import './communityJournalEntryView.css';
import TopBar from "../../components/TopBar";
import { entryHeadline, entryDate, getUserEntryContent } from '../../firebase/database'

export default function CommunityJournalEntryView() {
    const username = '';

    return (
        <><TopBar />
        <div className="journalEntryView">
            <div className="journalEntryViewContainer">
                <div className="postHeader">
                    <div className="title">
                        <h1></h1>
                    </div>
                </div>
                <div className="postTextContainer"></div>
                    {username ? (
                        <h3>Username:</h3>
                    ) : (
                        <h3>Loading...</h3>
                    )}
            </div>
            </div>
        </>
    );
}
