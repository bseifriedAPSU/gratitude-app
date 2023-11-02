import "./history.css";
import HomeArticlesSearch from "../../components/HomeArticlesSearch";
import TopBar from "../../components/TopBar";

export default function History() {

    return (
        <> <TopBar />
        <div className="history">
            <h1>History Page</h1>
            <HomeArticlesSearch />
        </div>
        </>
    )
}