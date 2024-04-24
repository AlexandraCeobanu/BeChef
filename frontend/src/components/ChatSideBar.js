import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
import AddMessage from "./AddMessage";
import { useEffect, useState } from "react";
import { getThreadMessages } from "../services/chat";
export default function ChatSideBar(props) {
    const [messages, setMessages] = useState([]);
    useEffect(()=> {
        getThreadMessages(props.thread.id)
        .then((response)=> {
            setMessages(response);
        })
        .catch((error) => {
            console.log(error)
        })
    },[props.thread])
    return(
        <div className="sidebar">
            <TitleSideBar showThreadChat={props.showThreadChat} title={props.thread.topic}></TitleSideBar>
            <div className="messages">
            {
                messages.map((message,index) => (
                    <Comment key={index} userId={message.senderId} comment = {message.comment}></Comment>
                ))
            }
            </div>
            <AddMessage threadId={props.thread.id}></AddMessage>
        </div>
    )
}

