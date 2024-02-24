import '../styles/login.scss';
import '../styles/register.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {registerUser} from '../services/register'
export default function Register(){

    const navigate = useNavigate();
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleLoginClick = (event) => {
        navigate('/login');
    }
    const changeEmailHandler = (event) =>{
        setEmail(event.target.value);
        setErrorMessage("");
    }

    const changeUsernameHandler = (event) =>{
        setUsername(event.target.value);
        setErrorMessage("");
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
        setErrorMessage("");
    } 
     const handleFormSubmit = (event) => {
        event.preventDefault();

        let user ={
            email: email,
            username: username,
            password: password
        }
        registerUser(user)
        .then (
            () => {
                setError(false);
                setEmail("");
                setUsername("");
                setPassword("");
                navigate('/succes');
            }
        )
        .catch((error) => {
            console.log(error);
            setError(true);
            setErrorMessage(error);
        })
     }

    return(
        <div className="page">
            <div className="left-side">
            <img src="/images/img8-nbk2.png" alt="Chef-gif" />
            </div>
            <div className="right-side-register">
            <div className="title">
            <img src="/images/orange-hat.svg" alt="Hat" id="hat2" />
            <h1>Be chef</h1>
            </div>
            <form onSubmit ={handleFormSubmit} className="form-class">
                <label htmlFor="email">Email</label><br></br>
                <input type="text" id="email" name="email" required onChange={changeEmailHandler} style={{ marginBottom: errorMessage === 'Invalid email' ? 0 : '1em' }}></input><br></br>
                {errorMessage === 'Invalid email' || errorMessage === 'Email already used' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <label htmlFor="username">Username</label><br></br>
                <input type="text" id="username" name="username" required onChange={changeUsernameHandler} style={{ marginBottom: errorMessage === 'Username already used' ? 0 : '1em' }}></input><br></br>
                {errorMessage === 'Username already used' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <label htmlFor="password">Password</label><br></br>
                <input type="password" id="password" name="password" required onChange={changePasswordHandler} style={{ marginBottom: errorMessage.includes("password") ? 0 : '1em' }}></input><br></br>
                {errorMessage.includes("password") ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <button type="submit" id="submit" name="submit" value="Register">Register</button>
            </form>
            <div id="line2">
                <p>Already have an account?</p>
                <button type="button" onClick={handleLoginClick}>Login</button>
            </div>
            </div>
        </div>
    )
}