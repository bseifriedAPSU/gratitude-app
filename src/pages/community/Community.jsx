import "./community.css";
import CommunityArticlesSearch from "../../components/CommunityArticlesSearch";
import TopBar from "../../components/TopBar";
export default function Community() {

    return (
        <>
           <TopBar />
        <div className="community">
          
            <h1>Community Page</h1>
            <CommunityArticlesSearch />   
        </div>
  
        </>
    )
}