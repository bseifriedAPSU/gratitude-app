import './topbar.css'


import Nav from './Nav';
export default function TopBar() {
    return (
        <div className="top">
            <div className="topLeft">
                {/*Place Holder for User Avatart Images*/}
                <div classname="UserInfo">
                <ul className="leftList">
                   
                    <li className="leftListItem"><i className="avatarImage fa-solid fa-user-astronaut"></i></li>
                    <li className="leftListItem">Username</li>
            
                    </ul>
                </div>
            </div>
            
            <div className="topCenter">  
           

            </div>
            <div className="topRight"><Nav /></div>
          
        </div>
    )
}

