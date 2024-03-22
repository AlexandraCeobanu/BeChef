import Logo from "./Logo"
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faMagnifyingGlass,faBell} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
export default function Header(){
    const navigate = useNavigate();
    const handleClickProfile = ()=> {
            navigate("/profile");
    }
    return(
        <div className="header">
            <div id="logo">
            <Logo></Logo>
            </div>
            <div className="nav-bar">
            <FontAwesomeIcon icon={faHome} className="icons" />
            <FontAwesomeIcon icon={faMagnifyingGlass}  className="icons" />
            <FontAwesomeIcon icon={faBell} className="icons" />
            </div>
            <div className="logout">
                <div>
                <FontAwesomeIcon icon={faUser} id="user-icon" onClick={handleClickProfile} />
                </div>
                <div className='buttons clicked' >
                <button type="button">Logout</button>
                </div>
            </div>
        </div>
    )
}