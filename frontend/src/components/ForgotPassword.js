import React, { useState } from 'react';
import '../styles/login.scss';
import '../styles/forgotPassword.scss'
import { useNavigate } from "react-router-dom";
import { changePassword } from '../services/password';
import Logo from './Logo';
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
                const data= {email: user.email};
                navigate('/changePassword', { state: data });
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
            <h1>Forgot Password</h1>
            <p id= "p-forgot-password">We will send you a code to confirm your new password</p>
            </div>
            <div>
            <form onSubmit={handleFormSubmit} className="form-class">
                <input type="text" id="email" name="email" required onChange={emailChangeHandler} placeholder='Email'></input><br></br>
                <input type="password" id="newPassword" name="newPassword" required onChange={passwordChangeHandler} placeholder='New Password' style={{ marginBottom: errorMessage !== '' ? 0 : '2em' }}></input><br></br>
                {errorMessage !== '' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <button type="submit" id="submit" name="submit" value="Login">Change Password</button>
            </form>
            </div>
            <div id="line1">
            <button type="button" className='buttons' onClick={handleLoginClick}>Login</button>
            <button type="button" className='buttons' onClick={handleRegisterClick}>Register</button>
            </div>
            </div>
            </div>
        </div>
    )
}