import './topbar.css'


import Nav from './Nav';
export default function TopBar() {
    return (
        <div className="top">
            <div className="topLeft">
              
                <div className="userInfo">
                   <img className="userBannerImage" src="images/avatarImage1.png" alt="UserBannerImage" />
                    <div className="userInfoUsername">Username</div>
                </div>
            </div>
            
            <div className="topCenter">  
            </div>
            <div className="topRight"><Nav /></div>
          
        </div>
    )
}

