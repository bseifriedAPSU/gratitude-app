import './topbar.css'
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';



export default function TopBar() {
    const navigate = useNavigate();



    return (
        <div className="top">
            <div className="topLeft">
              
                <div className="userInfo" onClick={() => navigate('/settings')}>
                   <img className="userBannerImage" src="images/avatarImage1.png" alt="UserBannerImage" />
                    <div className="userInfoUsername">Username</div>
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

