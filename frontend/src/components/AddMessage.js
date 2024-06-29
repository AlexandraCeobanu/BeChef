import { useState } from "react";
import { postMessage } from "../services/chat";
import {useNavigate } from "react-router-dom";
export default function AddMessage(props) {
    const [message,setMessage] = useState("");
    const navigate  =useNavigate();
    const handleValueChange = (event) => {
        setMessage(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        let messageObject = {
            message: message,
            senderId: JSON.parse(localStorage.getItem("user")).id,
            threadId: props.threadId
        }
          postMessage(props.threadId,messageObject)
          .then (
            () => {
                if(props.stompClient!==null && props.stompClient !==undefined)
                {
                    props.stompClient.send(`/app/${props.threadId}/messages`,[],JSON.stringify(messageObject));
                    props.stompClient.send(`/app/${props.threadId}/newMessage`,[],JSON.stringify(messageObject));
                    
                }

                setMessage("");
                props.handleMessageAdded();
                // props.handleCommentAdded();
            }
          )
          .catch((error)=> {
            setMessage("");
            console.log(error);
            navigate('/error')
          })
        }
    };
    return(
        <div className="add-message">
            <input type="text" placeholder="Send a message" value={message} onChange={handleValueChange} onKeyDown={handleKeyDown}></input>
        </div>
    )
}