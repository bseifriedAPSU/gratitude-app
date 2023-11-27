import '../css/components.css';
import React, { useState } from 'react';
import { searchJournalEntry } from '../firebase/databaseHomepage';
import { FaSearch } from "react-icons/fa";

export default function HistorySearchBar() {
    //set the initial search value to an empty string
    const [input, setInput] = useState("");

    //clicks the search button if the user clicks enter 
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getSearchInput();
        }
    };
    //gets the result of the users search and sets all items that match to local storage
    //send the user to the search results page to display all items that match the search 
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
