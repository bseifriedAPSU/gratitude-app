import "../css/pages.css";
import FilteredResults from "../components/FilteredResults";
import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

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
  
    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
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
                        <p>No Results Found</p>
                    )
                }
            </div>
            <div className="bottomPageContainer">
                <button className="backButton" onClick={goBack}>Previous Page</button>
            </div>
        </>

    )
}