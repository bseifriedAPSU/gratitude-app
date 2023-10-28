import "./homeArticlesSearch.css";
import React, { useEffect, useState } from 'react'
import { homepageJournalList } from '../firebase/database'

export default function HomeArticlesSearch() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const uid = localStorage.getItem('uid');
        const data = homepageJournalList(uid);

        setItems(data);
        setIsLoading(false); // Set loading to false when data is available
    }, []);

    return (
        <>
            <input className="homeSearchBar" placeholder="Home Page Search Bar..." />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            )}
        </>
    );
}
