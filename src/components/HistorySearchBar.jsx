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

    const getSearchInput = async () => {
        try {
            const data = await searchJournalEntry(input);

            localStorage.setItem('searchResults', JSON.stringify(data));
            window.location.href = '/SearchResults';
        } catch (error) {
            console.error('Error searching journal entry:', error);
        }
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
