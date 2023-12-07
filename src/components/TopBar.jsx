import '../css/components.css';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';
export default function TopBar() {
    const navigate = useNavigate();
    const usernameQuotes = JSON.stringify(localStorage.getItem('Username'));
    const imagenumber = JSON.parse(localStorage.getItem('UserImage'));
    //gets rid of quotes from JSON to render correctly
    const username = usernameQuotes.replace(/"/g, '');

    return (
        <div className="navContainer">
            <div className="topLeft">
                {/* Clicking on User Info Navigates to User Settings*/ }             
                <div className="userInfo" onClick={() => navigate('/settings')}>
                    { /* Popultates UserImage from local storage*/ }
                    <img
                        className="userBannerImage"
                        src={`./images/avatarImage${imagenumber}.png`}
                        alt="UserBannerImage"
                    />
                    <div className="userInfoUsername">{username}</div>
                </div>
            </div>
            
            <div className="topCenter"> 
                { /* Clicking on Logo Navigates to Home */ }
                <div className="topCenter-flex-container" onClick={() => navigate('/home')} >
                    <img className="topBarLogo" src="/images/gratitudeLogoIcon.svg" alt="Gratitide Icon"></img>
                </div>
            </div>
            { /* Navigation Hamburger Component */ }
            <div className="topRight"><Nav /></div>
          
        </div>
    )
}

