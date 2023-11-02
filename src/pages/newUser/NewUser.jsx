import "./newUser.css"
import UserSettings from "../../components/UserSettings"
import { userAccountCheck } from "../../firebase/database"

export default function NewUser() {

    return (
        <div className="newUser">
          
            <UserSettings />
        </div>

    )
}