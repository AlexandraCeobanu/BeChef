import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
import AddMessage from "./AddMessage";
import { useEffect, useState } from "react";
import { getThreadMessages } from "../services/chat";
export default function ChatSideBar(props) {
    const [messages, setMessages] = useState([]);
    const [messageAdded,setMessageAdded] = useState(false);
    useEffect(()=> {
        
        getThreadMessages(props.thread.id)
        .then((response)=> {
            setMessages(response);
            setMessageAdded(false);
        })
        .catch((error) => {
            console.log(error)
        })
    },[props.thread,messageAdded])
    const handleMessageAdded=()=> {
        setMessageAdded(true);
        props.handleMessageAdded();
    }

    return(
        <div className="sidebar">
            <TitleSideBar showThreadChat={props.showThreadChat} title={props.thread.topic}></TitleSideBar>
            <div className="messages">
            {
               messages.length !== 0 && messages.map((message,index) => (
                    <Comment key={index} userId={message.senderId} comment = {message.message}></Comment>
                ))
            }
            </div>
            <AddMessage threadId={props.thread.id} handleMessageAdded={handleMessageAdded}></AddMessage>
        </div>
    )
}

