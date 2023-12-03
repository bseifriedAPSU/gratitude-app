import '../css/components.css';
import '../css/pages.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsernameLocation, getUsernameFromString, getUsername } from '../firebase/databaseUser';
import { communityPageDisplay } from '../firebase/databaseCommunity';
import CommunitySearchBar from './CommunitySearchBar';

export default function CommunityArticlesSearch() {
    //sets the lsit of community articles to an empty array
    const [communityList, setCommunityList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    //updates the list of articles to render on the community page when data is available
    useEffect(() => {
        communityPageDisplay()
            .then((data) => {
                setCommunityList(data.reverse());
            }).catch((error) => {
                console.log('Error fetching articles: ', error);
            });
    }, []);

    //gets the result of click on an aritlce and takes the user to a new page to display the headline, content, and username of the creator 
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
    const currentCommunityList = communityList.slice(indexOfFirstArticle, indexOfLastArticle);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <CommunitySearchBar />
            <div className="pageContainer">
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
           
            </div>
        </>
    );
}
