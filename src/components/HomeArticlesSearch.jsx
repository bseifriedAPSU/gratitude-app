import "./homeArticlesSearch.css";
import React, { useEffect, useState } from 'react'
import { homepageJournalList } from '../firebase/database'

export default function HomeArticlesSearch() {
    const [items, setItems] = useState([]);

    const uid = localStorage.getItem('uid');

    useEffect(() => {
        homepageJournalList(uid)
            .then((data) => {
                setItems(data.reverse());
            }).catch((error) => {
                console.log('Error fetching articles: ', error);
            });

    }, []);

    console.log(items.length);

        return (
            <>
                <input className="homeSearchBar" placeholder="Home Page Search Bar..." /*on change HERE*/ />
                {items.length === 5 ? (
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </>
        )
    
}