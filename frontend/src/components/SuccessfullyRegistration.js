
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import '../styles/successfullyPage.scss'
import { sendConfirmationToken } from '../services/register';
import { resendLink } from '../services/register';
export default function SuccessfullyRegistration()
{
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Login");
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        sendConfirmationToken(token)
        .then((response) => {
            setSuccess(response);
        })
        .catch((error) => {
            console.log(error);
            setError(error);
        })
    },[])
    const handleResendLink = () => {
        resendLink(localStorage.getItem("email"))
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return(
        
        <div className='success'>
            {success !== "" ? (
                <div>
                 <FontAwesomeIcon id="circle-check" icon={faCircleCheck} size="5x" />
                 <h1>Congratulations!</h1>
                 <h2>You successfully registered</h2><br></br>
                 <button onClick={handleClick}>Login</button>
                 </div>
            ): 
            (
                error !== "" &&  ( <div> <h1>{error}</h1>
                {error === "Email already confirmed" && <button  type="button" onClick={handleClick}>Login</button>}
                {error !== "Email already confirmed" && <button  type="button" onClick={handleResendLink}>Resend Link</button>}
                </div>)
            )
         }
           
        </div>
    )
}