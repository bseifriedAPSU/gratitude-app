import "../css/pages.css";
import CommunityArticlesSearch from "../components/CommunityArticlesSearch";
import CommunityWordCloud from "../components/CommunityWordCloud";
import TopBar from "../components/TopBar";
import { useNavigate } from 'react-router-dom';
export default function Community() {
    //Back Button function
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <>
            <TopBar />
         
            <div className="community">

                <h1>Community</h1>
                <CommunityWordCloud />
                <CommunityArticlesSearch />   
                <div className="bottomPageContainer">
                    <button className="backButton" onClick={goBack}>Previous Page</button>
                </div>
                </div>
           



           
        </>
    )
}