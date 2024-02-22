import '../styles/login.scss';
import '../styles/register.scss';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {registerUser} from '../services/register'
export default function Register(){

    const [error,setError] = useState(false);
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const changeEmailHandler = (event) =>{
        setEmail(event.target.value);
    }

    const changeUsernameHandler = (event) =>{
        setUsername(event.target.value);
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
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
            }
        )
        .catch((error) => {
            console.log(error);
            setError(true);
        })
     }

    return(
        <div className="page">
            <div className="left-side">
            <img src="/images/Pizza maker2.gif" alt="Chef-gif" />
            </div>
            <div className="right-side">
            <div className="title">
            <img src="/images/hat.svg" alt="Hat" id="hat2" />
            <h1>Be chef</h1>
            </div>
            <form onSubmit ={handleFormSubmit} className="form-class">
                <label htmlFor="email">Email</label><br></br>
                <input type="text" id="email" name="email" required onChange={changeEmailHandler}></input><br></br>

                <label htmlFor="username">Username</label><br></br>
                <input type="text" id="username" name="username" required onChange={changeUsernameHandler}></input><br></br>
                
                <label htmlFor="password">Password</label><br></br>
                <input type="password" id="password" name="password" required onChange={changePasswordHandler}></input><br></br>


                <div id="line2">
                <p>Already have an account?</p>
                <p>Login</p>
                </div>

                <input type="submit" id="submit" name="submit" value="Register"></input>
            </form>
            </div>
        </div>
    )
}