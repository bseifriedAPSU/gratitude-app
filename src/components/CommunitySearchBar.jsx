import "./communitySearchBar.css";
import React, { useState } from 'react';

//TESTING
export default function CommunitySearchBar() {

    const [query, setQuery] = useState("")

    function search(e) {
        e.preventDefault()
        setQuery(e.target.value)

    } 
    return (
        <div className="communitySearchContainer">
            <input
                type="text"
                className="communitySearchInput"
                placeholder="Search"
                onChange={search}
                value={query}
            />

        </div>
    );
};

