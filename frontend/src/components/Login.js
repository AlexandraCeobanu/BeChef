import React, { useState } from 'react';
import '../styles/login.scss';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/login";
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

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        let user = {
            email: email,
            password: password
        }
        loginUser(user)
        .then(
            () => {
                setError(false);
                setEmail("");
                setPassword("");
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
            <img src="/images/Chef2.gif" alt="Chef-gif" />
            </div>
            <div className="right-side">
            <div className="title">
            <img src="/images/hat.svg" alt="Hat" id="hat" />
            <h1>Hello chef</h1>
            </div>
            <form onSubmit={handleFormSubmit} className="form-class">
                <label htmlFor="email">Email</label><br></br>
                <input type="text" id="email" name="email" required onChange={emailChangeHandler} style={{ marginBottom: errorMessage === 'Incorrect email' ? 0 : '1em' }}></input><br></br>
                {errorMessage === 'Incorrect email' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <div id="line1">
                <label htmlFor="password">Password</label>
                <p>Forgot password?</p>
                </div>
                <input type="password" id="password" name="password" required onChange={passwordChangeHandler} style={{ marginBottom: errorMessage === 'Incorrect password' ? 0 : '1em' }}></input>
                {errorMessage === 'Incorrect password' ? <p className="error-message">{errorMessage}</p> : <br></br>}
                <div id="line2">
                <p>Don't have an account?</p>
                {/* <button onClick={handleRegisterClick}>Register</button> */}
                </div>
                <input type="submit" id="submit" name="submit" value="Login"></input>
            </form>
            </div>
        </div>
    )
}