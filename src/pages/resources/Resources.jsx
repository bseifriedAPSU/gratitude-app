import "./resources.css"
import ResourcesList from "../../components/ResourcesList"
import TopBar from "../../components/TopBar";
export default function Resources() {

    return (
        <><TopBar />
        <div className="resources">
            <h1>Resources Page</h1>
            <ResourcesList />
        </div>
        </>
    )
}