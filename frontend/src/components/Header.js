import Logo from "./Logo"
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faBell} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import io from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header(props){
    const navigate = useNavigate();
    const [blur,setBlur] =useState(props.blur);
    const handleClickProfile = ()=> {
            navigate("/profile");
    }
    const handleLogout = () => {
        const socket = io('http://localhost:8082');
        socket.emit('remove-connection',JSON.parse(localStorage.getItem('user')).id);
        localStorage.clear();
        navigate("/login")
    }
    const handleHomeClick = () => {
        navigate("/home")
    }
    // useEffect (() => {
    //     const socket = io('http://localhost:8082');
    //     socket.emit('message', 'heei');

    //     socket.on('reply', (data) => {
    //         console.log('Received message from server:', data);
    //       });
    // },[])

    return(
        <div className="header">
            <div id="logo">
            <Logo></Logo>
            </div>
            <div className="nav-bar">
            <FontAwesomeIcon icon={faHome} className="icons" onClick={handleHomeClick} />
            <FontAwesomeIcon icon={faBell} className="icons" />
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