import './topbar.css'
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';



export default function TopBar() {
    const navigate = useNavigate();
    const usernameQuotes = JSON.stringify(localStorage.getItem('Username'));
    const imagenumber = JSON.parse(localStorage.getItem('UserImage'));

    //gets rid of quotes from JSON to render correctly
    const username = usernameQuotes.replace(/"/g, '');

    return (
        <div className="top">
            <div className="topLeft">
             
                <div className="userInfo" onClick={() => navigate('/settings')}>

                   {/* Need to update with local storage*/}
                    <img
                        className="userBannerImage"
                        src={`./images/avatarImage${imagenumber}.png`}
                        alt="UserBannerImage"
                    />


                    <div className="userInfoUsername">{username}</div>
                </div>
            </div>
            
            <div className="topCenter"> 
                <div className="topCenter-flex-container" onClick={() => navigate('/home')} >
                    {/* /<img className="topBarLogo" src="/images/gratitudeLogoHorizontal.svg" alt="Gratitide Logo"></img> */}
                </div>
            </div>
            <div className="topRight"><Nav /></div>
          
        </div>
    )
}

