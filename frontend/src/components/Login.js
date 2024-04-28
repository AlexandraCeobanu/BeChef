import React, { useState } from 'react';
import '../styles/login.scss';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/login";
import Logo from './Logo';
import {over} from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");
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
                const socket = new SockJS('http://localhost:8081/ws');
                let sc = null;
                if(socket!==null){
                sc = over(socket);
                sc.connect({}, function(frame) {
                console.log('Conectat la server WebSocket');
                const data = {stompClient : sc}
                navigate('/profile',{state: data})
                }) 
            }
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
                <input type="password" id="password" name="password" required onChange={passwordChangeHandler} placeholder='Password' style={{ marginBottom: errorMessage !== '' ? 0 : '1em' }}></input>
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