import './topbar.css'
import { Link } from "react-router-dom";
export default function TopBar() {
    return (
        <div className="top">
            <div className="topLeft">
                {/*Place Holder for User Avatart Images*/}
                <ul className="leftList">
                    <li className="leftListItem"><i className="avatarImage fa-solid fa-user-astronaut"></i></li>
                    <li className="leftListItem">Username</li>
                </ul>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/home">Home</Link></li>

                    <li className="topListItem">
                        <Link to="/history">History</Link></li>

                    <li className="topListItem">
                        <Link to="/community">Community</Link></li>

                    <li className="topListItem">
                        <Link to="/resources">Resources</Link></li>
                    <li className="topListItem">
                        <Link to="/settings">Settings</Link></li>
                    <li className="topListItem">Logout</li>
                </ul>
            </div>
            <div className="topRight"></div>
            
        </div>
    )
}

