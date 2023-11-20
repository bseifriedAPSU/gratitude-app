import "../css/pages.css";
import UserSettings from "../components/UserSettings";
import TopBar from "../components/TopBar";
import AdminSettings from "../components/AdminSettings";
export default function Settings() {

    return (
        <>
            <TopBar />
        <div className="settings">
            <h1>Settings</h1>
                <h3>Short Description Here</h3>
            <UserSettings />

            <AdminSettings />
        </div>
        </>
    )
}