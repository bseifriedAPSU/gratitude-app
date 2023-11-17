import "./searchResults.css";
import FilteredResults from "../../components/FilteredResults";
import TopBar from "../../components/TopBar";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {
    const [items, setItems] = useState([]);

    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

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
            <h1>Search Results Page</h1>
                {
                    items.length > 0 ? (
                        <ul>
                            {items.map((item, index) => (
                                <Link to={`/homepageJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))}><li className="articleItem" key={index}>{item}</li></Link>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )
                }

                <div className="bottomPageContainer">
                    <button className="backButton" onClick={goBack}>Previous Page</button>
                </div>
            </div>
        </>

    )
}