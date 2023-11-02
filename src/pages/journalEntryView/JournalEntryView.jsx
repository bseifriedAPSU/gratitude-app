import React, { useState, useEffect } from 'react';
import './journalEntryView.css';
import TopBar from "../../components/TopBar";
import { entryHeadline, entryDate, getUserEntryContent, getUsername } from '../../firebase/database'

export default function JournalEntryView() {
    const [content, setContent] = useState('');
    const [username, setUsername] = useState(null);
    const inputString = localStorage.getItem('inputString');
    var headline = entryHeadline(inputString);
    var date = entryDate(inputString);
    date = date.slice(0, -1);
    

    useEffect(() => {
        getUserEntryContent(headline, date)
            .then((data) => {
                setContent(data);
            }).catch((error) => {
                console.log(error);
            });

        getUsername()
            .then((data) => {
                setUsername(data);
            }).catch((error) => {
                console.log(error);
            });
    });
    console.log(username);
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
