import '../css/components.css';
import React, { useState, useEffect } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { searchJournalEntry, wordCloudList } from '../firebase/databaseHomepage';

export default function Wordcloud() {
    const [list, setList] = useState([]);

    const fetchData = async () => {
        try {
            const wordCloudArray = await wordCloudList(localStorage.getItem('uid'));
            if (wordCloudArray && Array.isArray(wordCloudArray)) {

                const words = wordCloudArray
                    .flatMap(item => item.match(/\b\w+\b/g) || []) // Split each string into words
                    .filter(Boolean);
                //list of stopwords  NOTE add irrelavant words as needed in alphabetical order PLEASE :)
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
                    'best',
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
                    'makes',
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
                    'i',
                    'm',
                    'I']);

                //list of words so that there aren't duplicates in the word cloud 
                const uniqueWords = new Set();

                //filtering out the words for the word cloud 
                const filteredWords = words
                    .map(word => word.trim())
                    //Can we filter stopwords here?
                    .filter(word => /^[a-zA-Z]+$/.test(word))
                    .filter(word => !stopWords.has(word))
                    .filter(word => {
                        if (!uniqueWords.has(word.toLowerCase())) {
                            uniqueWords.add(word.toLowerCase());
                            return true;
                        }
                        return false;
                    });

                const shuffledWords = filteredWords.sort(() => Math.random() - 0.5);

                const selectedWords = shuffledWords.slice(0, Math.min(50, shuffledWords.length));


                const wordsWithValues = selectedWords.map(word => ({
                    enableTooltip: false,
                    text: word.trim(),
                    value: Math.round((Math.random() * (100 - 50) + 50) / 5) * 5,
                }));
                setList(wordsWithValues);
            }
        } catch (error) {
            console.log("Error rendering the word cloud", error);
        }
    }

    useEffect(() => {
        fetchData();
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
        enableTooltip: false,
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
                    <p>Add more words to see word cloud.</p>
                )}
            </div>
        </div>
    );
}
