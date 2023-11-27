import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import Home from "./pages/Home";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import History from "./pages/History";
import Login from "./pages/Login";
import JournalEntryCreation from "./pages/JournalEntryCreation";
import SearchResults from "./pages/SearchResults";
import CommunitySearchResults from './pages/communitySearchResults';
import HomepageJournalEntryView from "./pages/HomepageJournalEntryView";
import CommunityJournalEntryView from './pages/CommunityJournalEntryView';
import NewUser from "./pages/NewUser";
import About from "./pages/About";

function App() {
    const [isUser, setIsUser] = useState(localStorage.getItem("isUser") === 'true');

    useEffect(() => {
        // This effect runs when the component mounts
        // Check and update the isUser state when the localStorage changes
        setIsUser(localStorage.getItem("isUser") === 'true');
    }, []);

    return (
        <Router>
            {!isUser && <Navigate to="/" />}

            <Routes>
                <Route path="/" element={<Login isUser={setIsUser} />} />
                <Route path="/home" element={<Home isUser={isUser} />} />
                <Route path="/community" element={<Community isUser={isUser} />} />
                <Route path="/settings" element={<Settings isUser={isUser} />} />
                <Route path="/resources" element={<Resources isUser={isUser} />} />
                <Route path="/history" element={<History isUser={isUser} />} />
                <Route path="/journalEntryCreation" element={<JournalEntryCreation isUser={isUser} />} />
                <Route path="/homepageJournalEntryView" element={<HomepageJournalEntryView isUser={isUser} />} />
                <Route path="/communityJournalEntryView" element={<CommunityJournalEntryView isUser={isUser} />} />
                <Route path="/searchResults" element={<SearchResults isUser={isUser} />} />
                <Route path="/communitySearchResults" element={<CommunitySearchResults isUser={isUser} />} />
                <Route path="/newUser" element={<NewUser isUser={isUser} />} />
                <Route path="/about" element={<About isUser={isUser} />} />
            </Routes>
        </Router>
    );
}

export default App;
