import '../css/components.css';
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { searchCommunityJournalEntry } from '../firebase/databaseCommunity'

export default function CommunitySearchBar() {
    const [input, setInput] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getSearchInput();
        }
    };

    const getSearchInput = async () => {
        try {
            const data = await searchCommunityJournalEntry(input);

            localStorage.setItem('searchResults', JSON.stringify(data));
            window.location.href = '/communitySearchResults';
        } catch (error) {
            console.error('Error searching journal entry:', error);
        }
    }

    return (
        <div className="input-wrapper">
            <div className="search-bar">
                <FaSearch id="search-icon" onClick={getSearchInput} />
                <input
                    placeholder="Search community entries..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />

            </div>
        </div>
    );
};
