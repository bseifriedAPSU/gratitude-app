import "./history.css";
import HomeArticlesSearch from "../../components/HomeArticlesSearch";
import TopBar from "../../components/TopBar";
import HistorySearchBar from "../../components/HistorySearchBar";
import { useState } from 'react';
import FilteredResults from "../../components/FilteredResults";

export default function History() {
    const [results, setResults] = useState([]);

    return (
        <>
            <TopBar />
            <div className="history">
                <h1>History Page</h1>
                
                <HistorySearchBar setResults={setResults} />
                <FilteredResults results={ results } />
            <HomeArticlesSearch />
        </div>
        </>
    )
}