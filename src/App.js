import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import Settings from "./pages/settings/Settings";
import Resources from "./pages/resources/Resources";
import History from "./pages/history/History";
import Login from "./pages/login/Login";
import JournalEntryCreation from "./pages/journalEntryCreation/JournalEntryCreation";
import SearchResults from "./pages/searchResults/SearchResults";
import JournalEntryView from "./pages/journalEntryView/JournalEntryView";
import NewUser from "./pages/newUser/NewUser";
//import Nav from "./components/Nav";


import {
    BrowserRouter as Router,
    Routes,
    Route
    
} from "react-router-dom";
import TopBar from "./components/TopBar";
import { useState } from "react";

 

function App() {

    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    
    return (

        
        // using isAuth to control visiblity of routes
        <Router>
            {isAuth ? (
                <>
                <Login />
                 
                </>
            ) : (
                <>
                 <TopBar />
                </>
            )}
            <Routes>
                <Route path="/" element={<Login isAuth={setIsAuth} />} />
                <Route path="/home" element={<Home isAuth={isAuth} />} />
                <Route path="/community" element={<Community isAuth={isAuth} />} />
                <Route path="/settings" element={<Settings isAuth={isAuth} />} />
                <Route path="/resources" element={<Resources isAuth = { isAuth } />} />
                <Route path="/history" element={<History isAuth={isAuth} />} />
                <Route path="/journalEntryCreation" element={<JournalEntryCreation isAuth={isAuth} />} />
                <Route path="/journalEntryView" element={<JournalEntryView isAuth={isAuth} />} />
                <Route path="/searchResults" element={<SearchResults isAuth={isAuth} />} />
                <Route path="/newUser" element={<NewUser isAuth={isAuth} />} />

               
 
            </Routes>
            
            
    </Router>
  );
}

export default App;
