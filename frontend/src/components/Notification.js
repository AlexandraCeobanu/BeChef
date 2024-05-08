import UserBadge from "./UserBadge"
import MiniRecipe from "./MiniRecipe"
import "../styles/notification.scss";
import { useEffect } from "react";
import { useState } from "react";
import { getThreadById } from "../services/chat";
export default function Notification(props){
    const [thread,setThread ] = useState(null);
    useEffect(() => {
        if(props.notification.type === "message")
        {
            getThreadById(props.notification.recipeId)
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
                    <div className="without-image">
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