import '../css/components.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactWordcloud from 'react-wordcloud';
import { searchJournalEntry } from '../firebase/databaseHomepage';

export default function Wordcloud() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const wordCloudArray = localStorage.getItem('wordCloudList');

        if (wordCloudArray) {
            const words = wordCloudArray.split(/\s+/);

            const uniqueWords = new Set();

            const filteredWords = words
                .map(word => word.trim())
                .filter(word => /^[a-zA-Z0-9]+$/.test(word))
                .filter(word => {
                    if (!uniqueWords.has(word)) {
                        uniqueWords.add(word);
                        return true;
                    }
                    return false;
                });

            const wordsWithValues = filteredWords.map(word => ({
                text: word.trim(),
                value: Math.round((Math.random() * (100 - 50) + 50) / 5) * 5,
            }));

            setList(wordsWithValues);
        }
    }, []);

    const handleWordClick = word => {
        searchJournalEntry(word).then(data => {
            localStorage.setItem('searchResults', JSON.stringify(data));
            window.location.href = '/SearchResults';
        });
    };

    const options = {
        rotations: 2,
        rotationAngles: [0],
        fontSizes: [20, 60, 75],
        // Adding stopwords to exclude certain words
        stopwords: ['taco', 'me', 'the', 'and'], // Replace these with your actual stopwords
    };

    return (
        <div className="wordcloud-container">
            <div className="circle-mask">
                {list && list.length > 0 ? (
                    <ReactWordcloud
                        words={list}
                        options={options}
                        callbacks={{
                            onWordClick: word => handleWordClick(word.text),
                        }}
                    />
                ) : (
                    <p>No data to display.</p>
                )}
            </div>
        </div>
    );
}
