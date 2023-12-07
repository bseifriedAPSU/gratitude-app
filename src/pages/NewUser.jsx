import "../css/pages.css";
import UserSettings from "../components/UserSettings"
// import { userAccountCheck } from "../firebase/databaseUser"

export default function NewUser() {

    return (
        <div className="newUser">       
            <UserSettings />
        </div>

    )
}