import "../css/pages.css";
import ResourcesList from "../components/ResourcesList"
import TopBar from "../components/TopBar";

export default function Resources() {

    return (
        <><TopBar />
        <div className="resources">
            <h1>Resources</h1>
            <h3>Here is a list of additional resources for you to explore!</h3>
            <ResourcesList />
        </div>
        </>
    )
}