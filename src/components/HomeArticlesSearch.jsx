import "./homeArticlesSearch.css";
import React, { useEffect, useState } from 'react'
import { homepageJournalList } from '../firebase/database'
import { Link } from 'react-router-dom'

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

    }, [uid]);

    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
    }

        return (
            <>
                <input className="homeSearchBar" placeholder="Home Page Search Bar..." /*on change HERE*/ />
                {items.length === 0 ? (
                    <p>No Journal Entries</p>
                ) : (
                        items.length > 0 ? (
                            <ul>
                                {items.map((item, index) => (
                                    <Link to={`/homepageJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))}><li key={index}>{item}</li></Link>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading...</p>
                        )
                )}
            </>
        )
    
}