import { useEffect, useState } from "react";
import { postThread } from "../services/chat";
export default function AddTopic(props)
{
    const [topic,setTopic] = useState("");
    const handleValueChange = (event) => {
        setTopic(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        let thread = {
            topic: topic,
            initiatorId: JSON.parse(localStorage.getItem("user")).id
        }
          postThread(thread)
          .then (
            () => {
                // if(props.socket!==null)
                // props.socket.emit("notifyComm", comm)
                // setComment("");
                // props.handleCommentAdded();
            }
          )
          .catch((error)=> {
            setTopic("");
            console.log(error);
          })
        }
    };

    return(
        <div className="add-thread">
            <input type="text" placeholder="Topic / question " value={topic} onChange={handleValueChange} onKeyDown={handleKeyDown}></input>
        </div>
    )
}