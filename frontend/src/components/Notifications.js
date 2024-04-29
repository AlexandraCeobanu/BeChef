import { useEffect, useState } from "react";
import Notification from "./Notification"
import { getAllNotifications } from "../services/notification";
export default function Notifications(props) {

    const [notifications,setNotifications]= useState([])
    useEffect (() => {
        getAllNotifications(JSON.parse(localStorage.getItem('user')).id)
        .then((notifications)=> 
    {
        setNotifications(notifications);
    })
    .catch((error)=> {
        console.log(error);
    })
    },[])
    useEffect (() => {
        if(props.receivedNot !== null)
        setNotifications((prevNot) => [props.receivedNot, ...prevNot]);
    },[props.newNotifications])

    return(
        <div className="notifications-box">

            {notifications.length > 0 && notifications.map((notification,index)=> 
            (<Notification key={index} notification={notification}></Notification>)
        )}
        </div>
    )
}