import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { communityPageDisplay, getUserReferenceLocation, getUsernameFromString } from '../firebase/database'
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


    const getLinkValue = (item) => {
        localStorage.setItem('inputString', item);
        localStorage.setItem('RefLocation', getUserReferenceLocation(getUsernameFromString(item)));
    }

    return (
    <>
            <input className="communitySearchBar"
                placeholder="Community Search Bar..."
                    /*on change HERE*/ />
            {communityList.length === 0 ? (
                <p>No Community Entries</p>
            ) : (
                communityList.length > 0 ? (
                    <ul>
                        {communityList.map((item, index) => (
                            <Link to={'/home'} onClick={ getLinkValue(JSON.stringify(item)) }><li key={index}>{item}</li></Link>
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )
            )}
        </>
)
}