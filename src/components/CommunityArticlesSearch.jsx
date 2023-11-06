import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { communityPageDisplay } from '../firebase/databaseCommunity';
import { getUsernameLocation, getUsernameFromString } from '../firebase/databaseUser';
import CommunitySearchBar from './CommunitySearchBar';

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
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
        console.log(getUsernameFromString(item));
        getUsernameLocation(getUsernameFromString(item)).then((data) => { 
            localStorage.setItem('RefLocation', data);
        })
    }

    return (
        <>

        <CommunitySearchBar />
            {communityList.length === 0 ? (
                <p>No Community Entries</p>
            ) : (
                communityList.length > 0 ? (
                    <ol>
                        {communityList.map((item, index) => (
                            <Link to={'/communityJournalEntryView'} onClick={() => getLinkValue(JSON.stringify(item))}><li key={index}>{item}</li></Link>
                        ))}
                    </ol>
                ) : (
                    <p>Loading...</p>
                )
            )}
        </>
)
}