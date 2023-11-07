import "./homeSearchBar.css";
import { db } from '../firebase/firebaseConfig';
import React, { useState } from 'react';

export default function HomeSearchBar() {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);



    //MY HANDLE IS NOT WORKING CORRECTLY
    
    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            const postRef = db.collection('posts');
            const snapshot = await postRef.where('headline', '>=', searchTerm).get();

            if (snapshot.empty) {
                console.log("No Match");
                setSearchResults([]);
                return;
            }

            const results = [];
            snapshot.forEach((doc) => {
                results.push({ id: doc.id, ...doc.data() });
            });
            setSearchResults(results);
        }
    };



    //THIS IS MY SEARCH BAR
    return (
        <div className="homeSearchBarContainer">
        <form>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Your Entries"
                />  
                <button type="submit" onClick={handleSearch} >Search</button >
            </form>


            { /* THIS IS THE PROTOTYPE FOR DISPLAYING THAT WILL NEED TO RENDER ON FilteredArticleView.jsx Page*/ }
            <div>
                {searchResults.map((post) => (
                <div key={post.id}>
                    <h3>{post.headline}{post.date}</h3>
                </div>
            ))}
            </div> 
        </div>
       
    );
};


