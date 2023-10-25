import "./login.css"
import React, { useState } from 'react'
import { signIn } from "./../../firebase/database.js"



export default function Login() {
    return (
        <div className="login">
            <h1>Gratitude++ Journal</h1>
            <button className="login-with-google-btn" onClick={signIn}>
                Sign in with Google
            </button>
        </div>

    )
    }
