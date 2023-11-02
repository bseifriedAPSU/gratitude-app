import "./settings.css";
import UserSettings from "../../components/UserSettings";
import TopBar from "../../components/TopBar";
export default function Settings() {

    return (
        <>
            <TopBar />
        <div className="settings">
            <h1>Settings</h1>
            <h3>----------------------------------------</h3>
            <UserSettings />
            <h3>----------------------------------------</h3>
            <h3>ADMIN SETTINGS COMPONENT GOES HERE</h3>
        </div>
        </>
    )
}