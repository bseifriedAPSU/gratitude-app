import React from 'react';
import { useNavigate } from 'react-router-dom';
import Wordcloud from "../../components/Wordcloud";
import HomeArticlesSearch from '../../components/HomeArticlesSearch';
import "./home.css";

export default function Home() {
    const navigate = useNavigate();

    
    return (
        <div className="home">  
            <Wordcloud />

            <button onClick={() => navigate('/journalEntryCreation')}>Create New Journal Entry Button</button>

            <HomeArticlesSearch />     
        </div>
    );
}
