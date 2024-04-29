import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faBellSlash,faBell} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from "react";
import { subscribeToThread } from "../services/chat";
export default function TitleSideBar (props) {

    const [subscribe, setSubscribe] = useState(false);
    const handleCloseSidebar=()=>{
        props.showThreadChat();
    }
    const handleThreadSubscribe=()=> {
        if(subscribe === false)
        {
            subscribeToThread(props.threadId,props.user.id)
            .then(() => {
                setSubscribe(true)
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
        else{
            setSubscribe(false);
        }
    }
    useEffect(() => {
        if(props.subscriebedThreads !== undefined){
        if (props.subscriebedThreads.some(thread => thread.id === props.thread.id) === true)
        setSubscribe(true)}
    },[])
    return(
        <div className="title">
            <h5>{props.title}</h5>
            <div className="icons">
            <FontAwesomeIcon icon= {subscribe === false ? faBellSlash : faBell} onClick={handleThreadSubscribe}></FontAwesomeIcon>
            <FontAwesomeIcon icon= {faXmark} onClick={handleCloseSidebar}></FontAwesomeIcon>
            </div>
        </div>
    )
}