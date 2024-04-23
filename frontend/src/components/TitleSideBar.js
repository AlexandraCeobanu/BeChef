import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark,faBell} from '@fortawesome/free-solid-svg-icons';
export default function TitleSideBar (props) {
    const handleCloseSidebar=()=>{
        props.showThreadChat();
    }
    return(
        <div className="title">
            <h4>Cozonaci</h4>
            <div className="icons">
            <FontAwesomeIcon icon= {faBell}></FontAwesomeIcon>
            <FontAwesomeIcon icon= {faXmark} onClick={handleCloseSidebar}></FontAwesomeIcon>
            </div>
        </div>
    )
}