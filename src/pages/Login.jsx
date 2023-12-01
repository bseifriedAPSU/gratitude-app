import "../css/pages.css";
import React, { useEffect } from 'react'
import { signIn, userAccountCheck, getUsername, getUserImage } from "./../firebase/databaseUser"
import { auth } from '../firebase/firebaseConfig'
import Header from "../components/Header"

export default function Login() {

    useEffect(() => {
        //listens for changes in the auth state
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                //sets the users uid in the local storage once the user is authorized
                localStorage.setItem('uid', auth.currentUser.uid);

                //checks if the user has an existing account in the database
                userAccountCheck(localStorage.getItem('uid'))
                    .then((accountExists) => {
                        if (accountExists) {

                            //set isUser to true if the user currently exists 
                            localStorage.removeItem('isUser');
                            localStorage.setItem('isUser', true.toString());

                            //get the username for the user and set it to local storage 
                            getUsername().then((data) => {
                                localStorage.removeItem('Username');
                                localStorage.setItem('Username', data); 
                            });

                            // getting user image # and setting to localstorage
                            getUserImage().then((data) => {
                                localStorage.setItem('UserImage', data);
                            });
                            //sets the users auth state to true to allow them to naviagte the site 
                            localStorage.setItem('isAuth', true.toString());
                            //sends the user to their homepage
                            window.location.href = '/home'
                        } else {
                            //sets the users auth state to true
                            localStorage.setItem('isAuth', true.toString());
                            //sets isUser to false, forcing them to create an account
                            localStorage.setItem('isUser', false.toString());
                            //sends the user to the newUser page 
                            window.location.href = '/newUser'
                        }
                    })
            }
        });
        
        return () => unsubscribe();
    }, []);

    const handleSignIn = async () => {
        try {
            await signIn();
            // The sign-in result will be handled by the onAuthStateChanged listener
        } catch (error) {
            console.error("Error signing in", error.message);
        }
    };

    return (
        <div className="login-Container">

            <Header />

            <button className="loginButton" onClick={handleSignIn}>
                Sign in with Google
            </button>

        </div>

    )
}
