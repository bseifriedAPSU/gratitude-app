import React, { useState, useEffect } from 'react'
import { communityPageDisplay } from '../firebase/database'
export default function CommunityArticlesSearch() { 

    const [communityList, setCommunityList] = useState([]);

    useEffect(() => {
        communityPageDisplay()
            .then((data) => {
                setCommunityList(data.reverse());
            }).catch((error) => {
                console.log('Error fetching articles: ', error);
            });
    }, []);

    return (
    <>
            <input className="communitySearchBar"
                placeholder="Community Search Bar..."
                    /*on change HERE*/ />
            {communityList.length === 5 ? (
                <ol>
                    {communityList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ol>
            ) : (
                <p>Loading...</p>
            )}
        </>
)
}