import React, { useState } from 'react';
import '../styles/login.scss';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/login";
import Logo from './Logo';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [seePassword,setSeePassword] = useState(false);
    const navigate = useNavigate();

    const handleRegisterClick = (event) => {
        navigate("/register");
    }
    const emailChangeHandler=(event) =>{
        setEmail(event.target.value);
        setErrorMessage("");
    }

    const passwordChangeHandler=(event) => {
        setPassword(event.target.value);
        setErrorMessage("");
    }
    const handleForgotPassword=()=>{
        navigate('/forgotpassword');
    }

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        let user = {
            email: email,
            password: password
        }
        loginUser(user)
        .then(
            (user) => {
                setError(false);
                setEmail("");
                setPassword("");
                setErrorMessage("");
               navigate("/profile");
            }
        )
        .catch((error) => {
            console.log(error);
            setError(true);
            setErrorMessage(error);
        })
    };

    const handleSeePassword=(() => {
        if(seePassword === false)
        setSeePassword(true);
        else
        setSeePassword(false);
    })


    return(
        <div className="page">
            <div className='mini-page'>
            <div className="left-side">
            </div>
            <div id="logo">
            <Logo></Logo>
            </div>
            <div className="right-side">
            <div className="title">
            <h1>Login </h1>
            </div>
            <div>
            <form onSubmit={handleFormSubmit} className="form-class">
                <input type="text" id="email" name="email" required onChange={emailChangeHandler} placeholder='Email'></input><br></br>
                {/* {errorMessage === 'Incorrect email' ? <p className="error-message">{errorMessage}</p> : <br></br>} */}
                <div className='password'>
                {
                    seePassword === false ? 
                    (
                        <input type="password" id="password" name="password" required onChange={passwordChangeHandler} placeholder='Password' 
                        style={{ marginBottom: errorMessage !== '' ? 0 : '1em' }}></input>
                        
                    ) : 
                    (<input type="text" id="password" name="password" required onChange={passwordChangeHandler} placeholder='Password' 
                        style={{ marginBottom: errorMessage !== '' ? 0 : '1em' }}></input>)
                }
                {seePassword === false ? (
                    <FontAwesomeIcon icon={faEyeSlash} id="eye" onClick={handleSeePassword}></FontAwesomeIcon>
                ) : (
                    <FontAwesomeIcon icon={faEye} id="eye" onClick={handleSeePassword}></FontAwesomeIcon>
                )}
                
                </div>
                {errorMessage !== '' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <div id="forgot-password">
                <button type="button" className='buttons' onClick={handleForgotPassword}>Forgot password?</button>
                </div>
                <button type="submit" id="submit" name="submit" value="Login">Login</button>
            </form>
            </div>
            <div id="line1">
                <p>Don't have an account?</p>
                <button type="button" className='buttons' onClick={handleRegisterClick}>Register</button>
            </div>
            </div>
            </div>
        </div>
    )
}