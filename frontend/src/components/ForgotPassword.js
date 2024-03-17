import React, { useState } from 'react';
import '../styles/login.scss';
import '../styles/forgotPassword.scss'
import { useNavigate } from "react-router-dom";
import { changePassword } from '../services/password';
export default function ForgotPassword(){
    const [email,setEmail] = useState('');
    const [newPassword,setnewPassword] = useState('');
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleRegisterClick = (event) => {
        navigate("/register");
    }
    const handleLoginClick = (event) => {
        navigate("/login")
    }
    const emailChangeHandler=(event) =>{
        setEmail(event.target.value);
        setErrorMessage("");
    }

    const passwordChangeHandler=(event) => {
        setnewPassword(event.target.value);
        setErrorMessage("");
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        let user = {
            email: email,
            password: newPassword
        }
        changePassword(user)
        .then(
            () => {
                setError(false);
                setEmail("");
                setnewPassword("");
                setErrorMessage("");
                navigate('/entercode');
            }
        )
        .catch((error) => {
            console.log(error);
            setError(true);
            setErrorMessage(error);
        })
    };
    return(
        <div className="page">
            <div className="left-side">
            {/* <img src="/images/Chef2.gif" alt="Chef-gif" /> */}
            {/* <img id = "main-image" src="/images/img8-nbk2.png" alt="image" /> */}
            </div>
            <div className="right-side">
            <h1 id="h1-forgot-password">Forgot password</h1>
            <p id= "p-forgot-password">We will send you a code to confirm your new password</p>
            <div>
            <form onSubmit={handleFormSubmit} className="form-class">
                <label htmlFor="Email">Email</label><br></br>
                <input type="text" id="email" name="email" required onChange={emailChangeHandler}></input><br></br>
                {/* {errorMessage === 'Incorrect email' ? <p className="error-message">{errorMessage}</p> : <br></br>} */}
                <div id="line1">
                <label htmlFor="newPassword">New Password</label>
                </div>
                <input type="password" id="newPassword" name="newPassword" required onChange={passwordChangeHandler} style={{ marginBottom: errorMessage !== '' ? 0 : '2em' }}></input><br></br>
                {errorMessage !== '' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <button type="submit" id="submit" name="submit" value="Login">Change Password</button>
            </form>
            </div>
            <div id="line3">
            <button type="button" onClick={handleLoginClick}>Login</button>
            <button type="button" onClick={handleRegisterClick}>Register</button>
            </div>
            </div>
        </div>
    )
}