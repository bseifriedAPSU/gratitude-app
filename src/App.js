import Home from "./pages/home/Home";
import TopBar from "./topbar/TopBar";
import Community from "./pages/community/Community";
import Settings from "./pages/settings/Settings";
import Resources from "./pages/resources/Resources";
import History from "./pages/history/History";
import Login from "./pages/login/Login";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
function App() {
    return (
      <Router>
            <TopBar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/resources" element={<Resources/>} />
                <Route path="/history" element={<History />} />

               
            
            </Routes>
            
            
    </Router>
  );
}

export default App;
