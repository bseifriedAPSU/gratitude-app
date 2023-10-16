import Home from "./pages/home/Home";
import TopBar from "./components/TopBar"
import Community from "./pages/community/Community";
import Settings from "./pages/settings/Settings";
import Resources from "./pages/resources/Resources";
import History from "./pages/history/History";
import Login from "./pages/login/Login";
import JournalEntryCreation from "./pages/journalEntryCreation/JournalEntryCreation";
import FilteredResults from "./pages/filteredResults/FilteredResults";
import JournalEntryView from "./pages/journalEntryView/JournalEntryView";
import NewUser from "./pages/newUser/NewUser";


import {
    BrowserRouter as Router,
    Routes,
    Route,
  //  Link
} from "react-router-dom";

function App() {
    return (

        /*MAY create Routes component to clean this up */

      <Router>
            <TopBar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/resources" element={<Resources/>} />
                <Route path="/history" element={<History />} />
                <Route path="/journalEntryCreation" element={<JournalEntryCreation />} />
                <Route path="/journalEntryView" element={<JournalEntryView />} />
                <Route path="/filteredResults" element={<FilteredResults />} />
                <Route path="/newUser" element={<NewUser />} />

               
 
            </Routes>
            
            
    </Router>
  );
}

export default App;
