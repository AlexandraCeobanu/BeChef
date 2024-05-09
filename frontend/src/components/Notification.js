import UserBadge from "./UserBadge"
import MiniRecipe from "./MiniRecipe"
import "../styles/notification.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getThreadById } from "../services/chat";
export default function Notification(props){
    const [thread,setThread ] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        if(props.notification.type === "message")
        {
            getThreadById(props.notification.threadId)
            .then((response) => {
                setThread(response)
            })
            .catch((error)=> {
                console.log(error);
            })
        }
    },[])
    const handleViewRecipe=(value)=> {
        props.handleViewRecipe(value);
    }
    const handleViewThread=()=>{
        if(thread!==null){
        const data= {sidebar : true,
                        thread : thread
                };
                navigate('/chat', { state: data });
    }}
    return(
        <div>

            {
                props.notification.type !== "message" ? (
                    <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div className="without-image">
                    <UserBadge userId={props.notification.senderId}></UserBadge>
                    <p>{props.notification.message}</p>
                    </div>
                    <MiniRecipe recipeId={props.notification.recipeId} handleViewRecipe={handleViewRecipe} index={props.index}></MiniRecipe>
                    </div>
                ) : 
                (
                    <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div className="thread-notification">
                    <h6>{thread !== null && thread.topic}</h6>
                    <div className="without-image" onClick={handleViewThread}>
                    <UserBadge userId={props.notification.senderId}></UserBadge>
                    <p>{props.notification.message}</p>
                    </div>
                    </div>
                    </div>

                )
            }
        </div>
    )
}