import React, { useState, useEffect } from 'react';
import './homepageJournalEntryView.css';
import TopBar from "../../components/TopBar";
import { entryHeadline, entryDate, getUserEntryContent } from '../../firebase/database'

export default function CommunityJournalEntryView() {

    const [content, setContent] = useState('');
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = entryHeadline(inputString);
    var date = entryDate(inputString);
    date = date.slice(0, -1);
    setUsername(localStorage.getItem('Username'));

    useEffect(() => {
        getUserEntryContent(headline, date)
            .then((data) => {
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
                        <h1>{ headline }</h1>
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
