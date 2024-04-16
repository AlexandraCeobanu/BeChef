import Logo from "./Logo"
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faBell} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header(props){
    const navigate = useNavigate();
    const [blur,setBlur] =useState(props.blur);
    const [notification,setNotification] = useState("");
   
    const handleClickProfile = ()=> {
            navigate("/profile");
    }
    const handleLogout = () => {
        if(props.socket!==null)
        props.socket.emit('remove-connection',JSON.parse(localStorage.getItem('user')).id);
        localStorage.clear();
        navigate("/login")
    }
    const handleHomeClick = () => {
        navigate("/home")
    }
    useEffect (() => {
        if(props.socket!==null)
        props.socket.on('new-notification', (data) => {
            console.log('Received message from server:', data);
           setNotification(data);
          });
    },[notification])

    return(
        <div className="header">
            <div id="logo">
            <Logo></Logo>
            </div>
            <div className="nav-bar">
            <FontAwesomeIcon icon={faHome} className="icons" onClick={handleHomeClick} />
            <FontAwesomeIcon icon={faBell} className="icons" />
            <div className="notification-number">2</div>
            </div>
            <div className="logout">
                <div>
                <FontAwesomeIcon icon={faUser} id="user-icon" onClick={handleClickProfile} />
                </div>
                <div className='buttons clicked'onClick={handleLogout} >
                <button type="button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}