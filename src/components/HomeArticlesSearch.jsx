import "./homeArticlesSearch.css";
import React, { useEffect, useState } from 'react'
import { homepageJournalList } from '../firebase/database'

export default function HomeArticlesSearch() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const uid = localStorage.getItem('uid');
        const list = homepageJournalList(uid).reverse();
            setItems(list);
    });

        return (
            <>
                <input className="homeSearchBar" placeholder="Home Page Search Bar..." /*on change HERE*/ />
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </>
        )
    
}