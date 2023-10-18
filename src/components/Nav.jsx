import Hamburger from "./Hamburger";
import { useState } from 'react';
import { Link } from "react-router-dom";
export default function Nav() {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }

    return (
        <div>
            <div className="navigation">
                <ul>
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


                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger isOpen={hamburgerOpen} />
                </div>
            </div>


            <style jsx>{`

                .navigation{
                    width: 100%;
                    height: 50px;
                }
                
                
                .navigation ul{
                    display:flex;
                    flex-wrap: wrap;
                    float: right;
                    margin: 0px;
                    padding: 0px;
                    overflow: hidden;
                }
                .navigation ul li{
                    list-style-type: none;
                    padding-right: 10px;

                }


                .hamburger{
                    display: none;
                    z-index: 6;
                } 


                @media (max-width: 767px){
                  
                    .hamburger{
                        display:fixed;
                        padding-top: 10px;
                        margin-left: 10px;
                        z-index: 6;
                    }

                
                   
                    .navigation ul{
                        display: ${hamburgerOpen ? 'inline' : 'none'};
                        background-color: blue;
                        height: 100vh;
                        width: 50vw;
                        margin-top: 50px;
                        position: fixed;
                        

                    }
                }
                
               
                
            `}</style>
        </div>
    )

}