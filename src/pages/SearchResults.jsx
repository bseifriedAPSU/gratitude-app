import "../css/pages.css";
import FilteredResults from "../components/FilteredResults";
import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function SearchResults() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;
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
    //pagination constructs
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = items.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <><TopBar />
        <div className="searchResults">
            <h1>Search Results</h1>
                {
                    items.length > 0 ? (
                        <ul>
                            {items.map((item, index) => (
                                <Link to={`/homepageJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))}><li className="articleItem" key={index}>{item}</li></Link>
                            ))}
                        </ul>
                    ) : (
                        <p>No Results Found</p>
                    )
                }
                <div className="pagination">
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
                    <span>{currentPage}</span>
                    <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastArticle >= items.length}>{'>'}</button>
                </div>
                <div className="bottomPageContainer">
                    <button className="backButton" onClick={goBack}>Previous Page</button>
                </div>
            </div>
        </>

    )
}