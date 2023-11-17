import "../css/pages.css";
import Wordcloud from "../components/Wordcloud";
import HomeArticlesSearch from '../components/HomeArticlesSearch';
import TopBar from '../components/TopBar';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function Home() {
    const navigate = useNavigate();

    return (
        <> <TopBar />
        <div className="home">  
                <Wordcloud />
                <button className="createButton" onClick={() => navigate('/journalEntryCreation')}>Create New Journal Entry Button</button>
                <HomeArticlesSearch />     
            </div>
        </>
    );
}
