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
            //split the array for the word cloud 
            const words = wordCloudArray.split(/\s+/);

            //list of stopwords 
            const stopWords = new Set([
                'and',
                'about',
                'after',
                'all',
                'also',
                'am',
                'an',
                'and',
                'another',
                'any',
                'are',
                'as',
                'at',
                'be',
                'because',
                'been',
                'before',
                'being',
                'between',
                'both',
                'but',
                'by',
                'came',
                'can',
                'come',
                'could',
                'did',
                'do',
                'each',
                'for',
                'from',
                'get',
                'got',
                'has',
                'had',
                'he',
                'have',
                'her',
                'here',
                'him',
                'himself',
                'his',
                'how',
                'if',
                'in',
                'into',
                'is',
                'it',
                'like',
                'make',
                'many',
                'me',
                'might',
                'more',
                'most',
                'much',
                'must',
                'my',
                'never',
                'now',
                'of',
                'on',
                'only',
                'or',
                'other',
                'our',
                'out',
                'over',
                'said',
                'same',
                'should',
                'since',
                'some',
                'still',
                'such',
                'take',
                'than',
                'that',
                'the',
                'their',
                'them',
                'then',
                'there',
                'these',
                'they',
                'this',
                'those',
                'through',
                'to',
                'too',
                'under',
                'up',
                'very',
                'was',
                'way',
                'we',
                'well',
                'were',
                'what',
                'where',
                'which',
                'while',
                'who',
                'with',
                'would',
                'you',
                'your',
                'a',
                'i']);

            //list of words so that there aren't duplicates in the word cloud 
            const uniqueWords = new Set();

            //filtering out the words for the word cloud 
            const filteredWords = words
                .map(word => word.trim())
                //Can we filter stopwords here?
                .filter(word => /^[a-zA-Z0-9]+$/.test(word))
                .filter(word => !stopWords.has(word))
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
