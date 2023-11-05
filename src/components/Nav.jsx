import React, { useState } from 'react';
import './nav.css'; 
import { Link } from 'react-router-dom';
import { signOutOfAccount } from './../firebase/databaseUser';

export default function Nav() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    //  toggle the drawer
    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };
    // close the drawer
    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <div className="topBar">
            <div className="topBarContent">
                <ul className={`topNavItems ${isDrawerOpen ? 'open' : ''}`}>
                    {isDrawerOpen && (
                        <li className="closeButton" onClick={closeDrawer}>
                            <button>X</button>
                        </li>
                    )}
                    {isDrawerOpen && (
                        <>
                            <li onClick={closeDrawer}>
                                <Link to="/home">Home</Link>
                            </li>
                            <li onClick={closeDrawer}>
                                <Link to="/history">History</Link>
                            </li>
                            <li onClick={closeDrawer}>
                                <Link to="/community">Community</Link>
                            </li>
                            <li onClick={closeDrawer}>
                                <Link to="/resources">Resources</Link>
                            </li>
                            <li onClick={closeDrawer}>
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li onClick={() => { signOutOfAccount(); closeDrawer(); }}>Logout</li>
                        </>
                    )}
                </ul>
                <div className="hamburger" onClick={toggleDrawer}>
                    <div className={`bar ${isDrawerOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isDrawerOpen ? 'open' : ''}`}></div>
                    <div className={`bar ${isDrawerOpen ? 'open' : ''}`}></div>
                </div>
            </div>
        </div>
    );
}
