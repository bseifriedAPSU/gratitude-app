import "./communitySearchBar.css";
import React, { useState } from 'react';
import Axios from 'axios';

//TESTING AXIOS
export default function CommunitySearchBar() {

    Axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
            console.log(res.data);
        });

  

    
    return (
        <div className="communitySearchContainer">
            <input
                type="text"
                className="communitySearchInput"
                placeholder="Search"
            />
            <p>  </p>
        </div>
    );
};

