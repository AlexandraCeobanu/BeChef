import { useState } from "react";
import { postMessage } from "../services/chat";
export default function AddMessage(props) {
    const [message,setMessage] = useState("");
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
                // if(props.socket!==null)
                // props.socket.emit("notifyComm", comm)
                setMessage("");
                // props.handleCommentAdded();
            }
          )
          .catch((error)=> {
            setMessage("");
            console.log(error);
          })
        }
    };
    return(
        <div className="add-message">
            <input type="text" placeholder="Send a message" onChange={handleValueChange} onKeyDown={handleKeyDown}></input>
        </div>
    )
}