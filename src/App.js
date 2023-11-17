import Home from "./pages/Home";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import History from "./pages/History";
import Login from "./pages/Login";
import JournalEntryCreation from "./pages/JournalEntryCreation";
import SearchResults from "./pages/SearchResults";
import CommunitySearchResults from './pages/communitySearchResults'
import HomepageJournalEntryView from "./pages/HomepageJournalEntryView";
import CommunityJournalEntryView from './pages/CommunityJournalEntryView';
import NewUser from "./pages/NewUser";
import About from "./pages/About";
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
