import React, { useState, useEffect } from 'react';
import './communityJournalEntryView.css';
import TopBar from "../../components/TopBar";
import { getCommunityHeadline, entryDate, displayCommunityEntry, getUsernameFromString } from '../../firebase/database'

export default function CommunityJournalEntryView() {

    const [content, setContent] = useState('');
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = getCommunityHeadline(inputString);
    console.log(headline);
    var date = entryDate(inputString);
    date = date.slice(0, -1);
    console.log(date);
    

    useEffect(() => {
        displayCommunityEntry(headline, date)
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
                    {username ? (
                        <h3>Username: {username}</h3>
                    ) : (
                        <h3>Loading...</h3>
                    )}
                </div>
            </div>
        </>
    );
}
