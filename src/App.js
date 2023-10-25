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


 

function App() {
  
    //const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    
    return (

        
       
        <Router>
                 <TopBar />
            <Routes>
                <Route path="/" element={<Login  />} />
                <Route path="/home" element={<Home  />} />
                <Route path="/community" element={<Community  />} />
                <Route path="/settings" element={<Settings  />} />
                <Route path="/resources" element={<Resources  />} />
                <Route path="/history" element={<History  />} />
                <Route path="/journalEntryCreation" element={<JournalEntryCreation  />} />
                <Route path="/journalEntryView" element={<JournalEntryView  />} />
                <Route path="/searchResults" element={<SearchResults  />} />
                <Route path="/newUser" element={<NewUser  />} />

               
 
            </Routes>
            
            
    </Router>
  );
}

export default App;
