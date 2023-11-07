import "./communitySearchBar.css";
import React, { useState } from 'react';


export default function CommunitySearchBar() {
    const [query, setQuery] = useState("")

    function search(e) {
        e.preventDefault()
        setQuery(e.target.value)

        //...
    }

    return (
        <div className="w-full max-w-xl flex mx-auto p-20 text-xl">
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

