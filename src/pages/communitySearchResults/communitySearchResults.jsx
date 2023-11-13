import "./communitySearchResults.css";
import FilteredResults from "../../components/FilteredResults";
import TopBar from "../../components/TopBar";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function CommunitySearchResults() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const searchResults = JSON.parse(localStorage.getItem('searchResults'));

        if (searchResults) {
            setItems(searchResults);
        }
    }, []);

    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
    }

    return (
        <><TopBar />
        <div className="searchResults">
            <h1>Search Results</h1>
                {
                    items.length > 0 ? (
                        <ul>
                            {items.map((item, index) => (
                                <Link to={`/communityJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))}><li className="articleItem" key={index}>{item}</li></Link>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </>

    )
}