import '../styles/login.scss'
import '../styles/enterCode.scss'
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { sendCode } from '../services/password';
import { useLocation } from 'react-router-dom';
import { resendLinkChangePassword } from '../services/password';
export default function EnterCode()  {
    
   const [code,setCode] = useState('');
   const [error,setError] = useState('');
   const location = useLocation();
    const  data  = location.state;
   const navigate = useNavigate();
    const codeChangeHandler=(event) => {
        event.preventDefault();
        setCode(event.target.value);
        setError("");

    }
    const  handleFormSubmit = (event)=>{
        event.preventDefault();
        sendCode(code)
        .then(
            () => {
                setCode("");
                setError("");
                const data= {message : 'Password successfully changed',
                            page : 'Login'
                };
                navigate('/success', { state: data });
            }
        )
        .catch((error) => 
            {
                setError(error);
                console.log(error);
                
            }
        )
    };
    const handleResendLink = () => {
        resendLinkChangePassword(data.email)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
            navigate('/error')
        })
    }
    return (
        <div className="page-enter-code">
            <h1>Verify your email</h1>
            <form onSubmit={handleFormSubmit} className='form-class'>
            <label htmlFor="Code">Enter Code</label><br></br>
            <input type="text" id="code" name="code" required onChange={codeChangeHandler} style={{ marginBottom: error !== '' ? 0 : '2em' }}></input><br></br>
            {error !== '' ? <p className="error-message">{error}</p> : <br></br>}
            <div className='buttons'>
            <button type="submit" id="submit" name="submit" value="send-code">Confirm</button>
            <button type="button" onClick={handleResendLink} >Resend link</button>
            </div>
            </form>
        </div>
    )
}