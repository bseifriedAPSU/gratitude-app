import "./communitySearchBar.css";
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { searchCommunityJournalEntry } from '../firebase/databaseCommunity'

export default function CommunitySearchBar() {
    const [input, setInput] = useState("");

    const getSearchInput = () => {
        searchCommunityJournalEntry(input).then((data) => {
            localStorage.setItem('searchResults', JSON.stringify(data));
            window.location.href = '/communitySearchResults'
        });
    }
    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon" onClick={getSearchInput} />
            <input
                placeholder="Search community entries..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </div>
    );
};

