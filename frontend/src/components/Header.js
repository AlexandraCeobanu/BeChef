import Logo from "./Logo"
import '../styles/header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHome,faMagnifyingGlass,faBell} from '@fortawesome/free-solid-svg-icons';
export default function Header(){
    return(
        <div className="header">
            <Logo></Logo>
            <div className="nav-bar">
            <FontAwesomeIcon icon={faHome} className="icons" />
            <FontAwesomeIcon icon={faMagnifyingGlass}  className="icons" />
            <FontAwesomeIcon icon={faBell} className="icons" />
            </div>
        </div>
    )
}