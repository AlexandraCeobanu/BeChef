import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faBellSlash,faBell} from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from "react";
import { subscribeToThread,unsubscribeToThread } from "../services/chat";
export default function TitleSideBar (props) {

    const [subscribe, setSubscribe] = useState(false);
    const handleCloseSidebar=()=>{
        props.showThreadChat();
    }
    const handleThreadSubscribe=()=> {
        if(subscribe === false)
        {
            console.log("subscribed")
            subscribeToThread(props.threadId,props.user.id)
            .then(() => {
                setSubscribe(true)
                props.handleSubscribeThread(true);
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
        else{
            unsubscribeToThread(props.threadId,props.user.id)
            .then(() => {
                
                setSubscribe(false);
                props.handleSubscribeThread(false);
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }
    useEffect(() => {
        if(props.subscribedThreads !== undefined){
        if (props.subscribedThreads.some(thread => thread.id === props.threadId) === true)
        setSubscribe(true)}
    },[props.subscribedThreads])

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