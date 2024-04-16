import { useEffect } from "react";
import Notification from "./Notification"
import { useLocation } from "react-router-dom";
export default function Notifications(props) {
    return(
        <div className="notifications-box">

            {props.notifications.length > 0 && props.notifications.map((notification,index)=> 
            (<Notification key={index} notification={notification}></Notification>)
        )}
        </div>
    )
}