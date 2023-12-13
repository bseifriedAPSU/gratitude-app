import "../css/pages.css";
import HomeArticlesSearch from "../components/HomeArticlesSearch";
import TopBar from "../components/TopBar";
import HistorySearchBar from "../components/HistorySearchBar";
import FilteredResults from "../components/FilteredResults";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';




export default function History() {
    const [results, setResults] = useState([]);

    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }


    return (
        <>
            <TopBar />
            <div className="history">
                <h1>History</h1>
                <h3>Here is your personal history page, where you can look back over
                    all the entries that you have created!</h3>
                <HistorySearchBar />
                <FilteredResults results={ results } />
                <HomeArticlesSearch />
  
                <div className="bottomPageContainer">
                    <button className="backButton" onClick={goBack}>Previous Page</button>
                </div>
        </div>
        </>
    )
}