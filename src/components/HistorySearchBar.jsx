import "./historySearchBar.css";
import React, { useState } from 'react';
import { searchJournalEntry } from '../firebase/databaseHomepage';
import { FaSearch } from "react-icons/fa";

export default function HistorySearchBar() {
    const [input, setInput] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getSearchInput();
        }
    };

    const getSearchInput = () => {
        searchJournalEntry(input).then((data) => {
            localStorage.setItem('searchResults', JSON.stringify(data));
            window.location.href = '/SearchResults'
        });
    }

    return (
        <div className="input-wrapper">
            <div className="search-bar">
                <FaSearch id="search-icon" onClick={getSearchInput} />
                <input
                    placeholder="Search your entries..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
};
