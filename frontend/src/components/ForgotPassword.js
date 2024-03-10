import React, { useState } from 'react';
import '../styles/login.scss';
import '../styles/forgotPassword.scss'
import { useNavigate } from "react-router-dom";
import { changePassword } from '../services/password';
export default function ForgotPassword(){
    const [email,setEmail] = useState('');
    const [newPassword,setNewPassword] = useState('');
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
        setNewPassword(event.target.value);
        setErrorMessage("");
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        let user = {
            email: email,
            newPassword: newPassword
        }
        changePassword(user)
        .then(
            () => {
                setError(false);
                setEmail("");
                setNewPassword("");
                navigate('/home')
                setErrorMessage("")
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
            <div className="title">
            {/* <img src="/images/orange-hat.svg" alt="Hat" id="hat" /> */}
            <h2>Forgot password</h2>
            </div>
            <div>
            <form onSubmit={handleFormSubmit} className="form-class">
                <label htmlFor="">Email</label><br></br>
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