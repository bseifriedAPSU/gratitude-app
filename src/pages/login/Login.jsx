import "./login.css"
import { firebaseAuthentication } from "./../../firebase/database.js"
export default function Login() {

    return (
        <div className="login">
        <Header/>
        
            <button className="login-with-google-btn" onClick={firebaseAuthentication}>
                Sign in with Google
            </button>
        </div>

    )
}