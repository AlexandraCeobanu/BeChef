import '../styles/login.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {registerUser} from '../services/register'
import SuccessfullyPage from './SuccessfullyPage';
import Logo from './Logo';
export default function Register(){

    const navigate = useNavigate();
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

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
                setIsRegistered(true);
                // const data= {message : 'You successfully registered',
                //             page : 'Home'
                //             };
                // setIsRegistered(true);
                // navigate('/success', { state: data });
            }
        )
        .catch((error) => {
            console.log(error);
            setError(true);
            setErrorMessage(error);
            setIsRegistered(false);
        })
     }
    return(
        <div className="page">
            {isRegistered === false ? 
            (<div className='mini-page'>
            <div className="left-side">
            </div>
            <div id="logo">
            <Logo></Logo>
            </div>
            <div className="right-side">
            <div className="title">
            <h1>Register</h1>
            </div>
            <form onSubmit ={handleFormSubmit} className="form-class">
                <input type="text" id="email" name="email" required onChange={changeEmailHandler} placeholder='Email' style={{ marginBottom: errorMessage === 'Invalid email' ? 0 : '1em' }}></input><br></br>
                {errorMessage === 'Invalid email' || errorMessage === 'Email already used' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <input type="text" id="username" name="username" required onChange={changeUsernameHandler} placeholder='Username' style={{ marginBottom: errorMessage === 'Username already used' ? 0 : '1em' }}></input><br></br>
                {errorMessage === 'Username already used' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <input type="password" id="password" name="password" required onChange={changePasswordHandler} placeholder='Password' style={{ marginBottom: errorMessage.includes("password") ? 0 : '1em' }}></input><br></br>
                {errorMessage.includes("password") ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <button type="submit" id="submit" name="submit" value="Register">Register</button>
            </form>
            <div id="line1">
                <p>Already have an account?</p>
                <button type="button" className='buttons' onClick={handleLoginClick}>Login</button>
            </div>
            </div>
            </div>) : 
            (
                <div>
                    <h1>To finish registration, please verify your email</h1>
                </div>
            )}

        </div>
    )}
