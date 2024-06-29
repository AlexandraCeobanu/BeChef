import { useEffect, useState } from "react";
import Notification from "./Notification"
import { getAllNotifications } from "../services/notification";
import { useNavigate } from "react-router-dom";
export default function Notifications(props) {

    const [notifications,setNotifications]= useState([])
    const [response, setResponse] = useState(false);
    let navigate= useNavigate();
    useEffect (() => {
        getAllNotifications(JSON.parse(localStorage.getItem('user')).id)
        .then((notifications)=> 
    {
        setResponse(true);
        setNotifications(notifications);
    })
    .catch((error)=> {
        console.log(error);
        navigate('/error')
    })
    },[])
    useEffect (() => {
        if(props.receivedNot !== null)
        setNotifications((prevNot) => [props.receivedNot, ...prevNot]);
    },[props.newNotifications])

    const handleViewRecipe = (notificationIndex) => {
        let recipeId = notifications[notificationIndex].recipeId;
        const data= {recipeId : recipeId};
        props.handleShowNotifications();
                navigate('/viewRecipe', { state: data });
    }
    return(
        <div className="notifications-box">
            {response===true && notifications.length === 0 && <div id="no-notification"><h3>No Notification received</h3></div>}
            {response===true && notifications.length > 0 && notifications.map((notification,index)=> 
            (<Notification key={index} notification={notification} handleViewRecipe={handleViewRecipe} index={index}></Notification>)
        )}
        </div>
    )
}