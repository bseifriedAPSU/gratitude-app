import React from 'react'
import { communityPageDisplay } from '../firebase/database'
export default function CommunityArticlesSearch() { 

    var list = communityPageDisplay().reverse();

    return (
    <>
            <input className="communitySearchBar"
                placeholder="Community Search Bar..."
                    /*on change HERE*/ />
            <ol>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
        </>
)
}