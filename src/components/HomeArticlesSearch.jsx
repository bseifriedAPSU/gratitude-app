import "./homeArticlesSearch.css";
import React, { useEffect, useState } from 'react';
import { homepageJournalList, wordCloudList } from '../firebase/database';
import { Link } from 'react-router-dom';
import HomeSearchBar from "../components/HomeSearchBar"

export default function HomeArticlesSearch() {
    
 


    
    const uid = localStorage.getItem('uid');
    const [items, setItems] = useState([]);

    useEffect(() => {
        homepageJournalList(uid)
            .then((data) => {
                setItems(data.reverse());
            }).catch((error) => {
                console.log('Error fetching articles: ', error);
            });


        wordCloudList(uid)
            .then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            });

    }, [uid]);

    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
    }

        return (
            <>

                <HomeSearchBar />
               
                    {
                        items.length > 0 ? (
                            <ul>
                                {items.map((item, index) => (
                                    <Link to={`/homepageJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))}><li key={index}>{item}</li></Link>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )
                    }
            </>
        )
    
}