import '../css/components.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsernameLocation, getUsernameFromString } from '../firebase/databaseUser';
import { communityPageDisplay } from '../firebase/databaseCommunity';
import CommunitySearchBar from './CommunitySearchBar';

export default function CommunityArticlesSearch() {
    const [communityList, setCommunityList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    useEffect(() => {
        communityPageDisplay()
            .then((data) => {
                setCommunityList(data.reverse());
            }).catch((error) => {
                console.log('Error fetching articles: ', error);
            });
    }, []);

    const getLinkValue = (item) => {
        localStorage.removeItem('inputString');
        localStorage.setItem('inputString', item);
        console.log(getUsernameFromString(item));
        getUsernameLocation(getUsernameFromString(item)).then((data) => {
            localStorage.setItem('RefLocation', data);
        });
    };

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentCommunityList = communityList.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <CommunitySearchBar />
            <div className="communityArticleContainer">
                {communityList.length === 0 ? (
                    <p>No Community Entries</p>
                ) : (
                    <>
                        <ul>
                            {currentCommunityList.map((item, index) => (
                                <Link to={'/communityJournalEntryView'} onClick={() => getLinkValue(JSON.stringify(item))} key={index}>
                                    <li className="articleItem">{item}</li>
                                </Link>
                            ))}
                        </ul>
                        <div className="pagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
                            <span>{currentPage}</span>
                            <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastArticle >= communityList.length}>{'>'}</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
