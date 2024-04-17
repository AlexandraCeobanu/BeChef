import Logo from "./Logo"
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faBell} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNumberOfUnreadNotifications, readAllNotifications } from "../services/notification";
import Notifications from "./Notifications";

export default function Header(props){
    const navigate = useNavigate();
    // const [blur,setBlur] =useState(props.blur);
    const [nrNotifications,setNrNotifications] = useState(0);
    const [showNotification,setShowNotification] = useState(false);
   
    const handleClickProfile = ()=> {
            navigate("/profile");
    }
    const handleLogout = () => {
        if(props.socket!==null){
        props.socket.emit('remove-connection',JSON.parse(localStorage.getItem('user')).id);}
        localStorage.clear();
        navigate("/login")
    }
    const handleHomeClick = () => {
        navigate("/home")
    }
    useEffect (() => {
        if(props.socket !==null){
        props.socket.on('new-notification', (data) => {
            setNrNotifications(prev=> prev+1);
          });
        }
    },[props.socket])


    const handleShowNotifications = ()=> {
        if(showNotification === false)
        {setShowNotification(true);
            setNrNotifications(0);}

    else{
        readAllNotifications(JSON.parse(localStorage.getItem('user')).id)
        .then(()=> {
            setShowNotification(false);
            
        })
        .catch((error) => {
                console.log(error);
        })
       
    }
    }

    useEffect (() => {
        getNumberOfUnreadNotifications(JSON.parse(localStorage.getItem('user')).id)
        .then((response) => {
                setNrNotifications(response);
        })
        .catch((error) => {
            console.log(error)
        })
    },[])
   

    return(
        <div className="header">
            <div id="logo">
            <Logo></Logo>
            </div>
            <div className="nav-bar">
            <FontAwesomeIcon icon={faHome} className="icons" onClick={handleHomeClick} />
            <div className="notifications">
            <FontAwesomeIcon icon={faBell} className="icons" onClick={handleShowNotifications}/>
             {nrNotifications!==0 && <div className="notification-number">{nrNotifications}</div>}
             {showNotification === true && <Notifications newNotifications={nrNotifications} socket={props.socket}></Notifications>}
            </div>
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