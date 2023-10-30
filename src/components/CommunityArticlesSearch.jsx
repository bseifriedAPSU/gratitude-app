import React, { useState, useEffect } from 'react'
import { communityPageDisplay } from '../firebase/database'
export default function CommunityArticlesSearch() { 

    const [communityList, setCommunityList] = useState([]);

    useEffect(() => {
        var list = communityPageDisplay().reverse();
        setCommunityList(list);
        console.log(list);
    });

    return (
    <>
            <input className="communitySearchBar"
                placeholder="Community Search Bar..."
                    /*on change HERE*/ />
            <ol>
                {communityList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
        </>
)
}