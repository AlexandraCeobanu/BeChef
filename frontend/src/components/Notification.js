import UserBadge from "./UserBadge"
import MiniRecipe from "./MiniRecipe"
import "../styles/notification.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getThreadById } from "../services/chat";
import { getStockItemById } from "../services/stockList";
import {faExclamation} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addCollaborator } from "../services/shoppingList";
import{ Alert,Space } from "antd";
import dayjs from "dayjs";
export default function Notification(props){
    const [thread,setThread ] = useState(null);
    const [stockItem,setStockItem] = useState(null);
    const [seeInvitation, setSeeInvitation] = useState(false);
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
        if(props.notification.type === "expires")
            {
                getStockItemById(props.notification.stockItemId)
                .then((response) => {
                    setStockItem(response)
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
    const handleAcceptInvitation=()=>{
        setSeeInvitation(true);

    }
    const handleInvitationAccepted=()=> {
        addCollaborator(props.notification.listId,props.notification.receiverId)
        .then((response)=>{
            console.log(response);
            setSeeInvitation(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return(
        <div>

            {
                (props.notification.type === "like" || props.notification.type === "comment") && (
                    <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div className="without-image">
                    <UserBadge userId={props.notification.senderId}></UserBadge>
                    <p>{props.notification.message}</p>
                    </div>
                    <MiniRecipe recipeId={props.notification.recipeId} handleViewRecipe={handleViewRecipe} index={props.index}></MiniRecipe>
                    </div>
                ) }
            {
                props.notification.type === "message" &&
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
              {
                props.notification.type === "list" &&
                (
                    <div onClick={handleAcceptInvitation} className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div  className="thread-notification">
                    <h6>list</h6>
                    <div className="without-image">
                    <UserBadge userId={props.notification.senderId}></UserBadge>
                    <p>{props.notification.message}</p>
                    </div>
                    </div>
                    </div>

                )
            }
            {
                props.notification.type === "expires"   &&
                (
                    <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div className={props.notification.message === "expired" ? "ingredient-expired" : "ingredient-expires"}>
                    
                    <FontAwesomeIcon icon={faExclamation} id="exclamation"></FontAwesomeIcon>
                    {props.notification.message === "expired" && (<p>Ingredient expired: </p>)}
                    {stockItem !== null && props.notification.message.includes("Expires") && (<p>{props.notification.message}</p>)}
                    <h6>{stockItem !== null && stockItem.item}</h6>
                    </div>
                    {/* {stockItem !== null && (<Alert message={props.notification.message} type="error" style={{"height" : "100%"}}></Alert>)} */}
                    
                    
                    </div>

                )
            }
        {
            seeInvitation === true && (
                
                <Space
    direction="vertical"
    style={{
      width: '100%',
    }}
  >
    <Alert
      message="Accept or Decline the invitation" className="invitation-alert"
      description={<div style={{display:"flex" , gap:"2em"}}><button className="button" onClick={handleInvitationAccepted}>Accept</button>
      <button className="button" onClick={handleInvitationAccepted}>Decline</button>
      </div>}
      type="info"
      showIcon = {false}/>
      </Space>
            )
        }
        </div>
    )
}