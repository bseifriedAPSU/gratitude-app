import React, { useEffect, useState } from 'react';
import { homepageJournalList, wordCloudList } from '../firebase/databaseHomepage';
import { Link } from 'react-router-dom';
import './homeArticlesSearch.css';

export default function HomeArticlesSearch() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    const uid = localStorage.getItem('uid');

    useEffect(() => {
        homepageJournalList(uid)
            .then((data) => {
                setItems(data.reverse());
            }).catch((error) => {
                console.log('Error fetching entries: ', error);
            });

        wordCloudList(uid)
            .then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            });

    }, [uid]);

    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
    };

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
