import Logo from "./Logo"
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faMagnifyingGlass,faBell} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Header(props){
    const navigate = useNavigate();
    const [blur,setBlur] =useState(props.blur);
    const handleClickProfile = ()=> {
            navigate("/profile");
    }
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login")
    }
    const handleHomeClick = () => {
        navigate("/home")
    }
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