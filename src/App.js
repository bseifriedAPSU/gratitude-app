import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import Settings from "./pages/settings/Settings";
import Resources from "./pages/resources/Resources";
import History from "./pages/history/History";
import Login from "./pages/login/Login";
import JournalEntryCreation from "./pages/journalEntryCreation/JournalEntryCreation";
import SearchResults from "./pages/searchResults/SearchResults";
import CommunitySearchResults from './pages/communitySearchResults/communitySearchResults'
import HomepageJournalEntryView from "./pages/HomepageJournalEntryView/HomepageJournalEntryView";
import CommunityJournalEntryView from './pages/CommunityJournalEntryView/CommunityJournalEntryView';
import NewUser from "./pages/newUser/NewUser";
import About from "./pages/about/About";
//import TopBar from "./components/TopBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Nav from "./components/Nav";
import { useState } from 'react';





function App() {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
                <Route path="/home" element={<Home isAuth={isAuth} />} />
                <Route path="/community" element={<Community isAuth={isAuth} />} />
                <Route path="/settings" element={<Settings isAuth={isAuth} />} />
                <Route path="/resources" element={<Resources isAuth={isAuth} />} />
                <Route path="/history" element={<History isAuth={isAuth} />} />
                <Route path="/journalEntryCreation" element={<JournalEntryCreation isAuth={isAuth} />} />
                <Route path="/homepageJournalEntryView" element={<HomepageJournalEntryView isAuth={isAuth} />} />
                <Route path="/communityJournalEntryView" element={<CommunityJournalEntryView isAuth={isAuth} />} />
                <Route path="/searchResults" element={<SearchResults isAuth={isAuth} />} />
                <Route path="/communitySearchResults" element={<CommunitySearchResults isAuth={isAuth} />} />
                <Route path="/newUser" element={<NewUser isAuth={isAuth} />} />
                <Route path="/about" element={<About isAuth={isAuth} />} />
            </Routes>
        </Router>
    );
}

export default App;
