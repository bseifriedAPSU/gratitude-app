import '../css/components.css';
import React, { useEffect, useState } from 'react';
import { homepageJournalList } from '../firebase/databaseHomepage';
import { Link } from 'react-router-dom';


export default function HomeArticlesSearch() {

    //item array for homepage article render 
    const [items, setItems] = useState([]);
    //current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    const uid = localStorage.getItem('uid');

    //gets the list of all articles from the user and displays them on the homepage with 5 articles per page 
    useEffect(() => {
        homepageJournalList(uid)
            .then((data) => {
                setItems(data.reverse());
            }).catch((error) => {
                console.log('Error fetching entries: ', error);
            });

    }, [uid]);

    //gets the result of the user clicking on an item to view on the homepage 
    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
    };

    //pagination constructs
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = items.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="pageContainer">
            <div className="homeArticleContainer">
                {
                    items.length > 0 ? (
                        <>
                            <ul>
                                {currentArticles.map((item, index) => (
                                    <Link to={`/homepageJournalEntryView`} onClick={() => getLinkValue(JSON.stringify(item))} key={index}>
                                        <li className="articleItem">{item}</li>
                                    </Link>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
                <span>{currentPage}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastArticle >= items.length}>{'>'}</button>
            </div>
        </div>
    );
}
