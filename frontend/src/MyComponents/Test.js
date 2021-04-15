import '.test.css'
import React, { useState } from "react";
import { useSpring, animated } from "react-spring"; // react-spring

const Test = () => {
    return (
        <div className="login-register-wrapper">
        <div className="nav-buttons">
            <button id="loginBtn" class="active">Login</button>
            <button id="registerBtn">Register</button>
        </div>
        <div className="form-group">
            <form action="" id="loginform">
            </form>
            <form action="" id="registerform">    
            </form>
        </div>
        <div id="forgot-panel">
        </div>
    </div>
    )
}

export default Test
