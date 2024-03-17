
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';
import '../styles/successfullyPage.scss'
export default function SuccessfullyPage()
{
    const location = useLocation();
    const  data  = location.state;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/Home");
    }
    return(
        <div className='success'>
            <FontAwesomeIcon id="circle-check" icon={faCircleCheck} size="5x" />
            <h1>Congratulations!</h1>
            <h2>{data.message}</h2><br></br>
            {/* <h4>To activate your account, please check your email</h4> */}
            <button onClick={handleClick}>{data.page}</button>
        </div>
    )
}