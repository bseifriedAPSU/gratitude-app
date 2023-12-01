import "../css/pages.css";
import TopBar from "../components/TopBar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getUsernameLocation, getUsernameFromString } from '../firebase/databaseUser'
export default function CommunitySearchResults() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    useEffect(() => {
        const searchResults = JSON.parse(localStorage.getItem('searchResults'));

        if (searchResults) {
            setItems(searchResults);
        }
    }, []);

    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
        getUsernameLocation(getUsernameFromString(item)).then((data) => {
            localStorage.setItem('flagUsername', getUsernameFromString(item));
            localStorage.setItem('RefLocation', data);
        });
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = items.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


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
                            {currentArticles.map((item, index) => (
                                <Link to={`/communityJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))}><li className="articleItem" key={index}>{item}</li></Link>
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