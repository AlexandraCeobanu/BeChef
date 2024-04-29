import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
import AddMessage from "./AddMessage";
import { useEffect, useState } from "react";
import { getThreadMessages } from "../services/chat";
import { useStompClient } from "./WebSocketProvider";

export default function ChatSideBar(props) {
    const [messages, setMessages] = useState([]);
    const [messageAdded,setMessageAdded] = useState(false);
    const client = useStompClient();


    useEffect(()=> {
        getThreadMessages(props.thread.id)
        .then((response)=> {
            setMessages(response);
            setMessageAdded(false);
        })
        .catch((error) => {
            console.log(error)
        })
    },[props.thread])

    const handleMessageAdded=()=> {
        setMessageAdded(true);
        props.handleMessageAdded();
    }
    useEffect (() => {
    if(client)
     {
        const subscription = client.subscribe(`/newMessage`, function(message) {
                     const receivedMessage = JSON.parse(message.body)
                    if(receivedMessage.threadId === props.thread.id){
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);}
                    else{
                     props.handleMessageAdded();
                    }
                    });

        return () => {
                subscription.unsubscribe();
                    };
     }
    },[client])

   

    return(
        <div className="sidebar">
            <TitleSideBar showThreadChat={props.showThreadChat} title={props.thread.topic} 
            subscribedThreads={props.subscribedThreads} threadId={props.thread.id} user={props.user}></TitleSideBar>
            <div className="messages">
            {
               messages.length !== 0 && messages.map((message,index) => (
                    <Comment key={index} userId={message.senderId} comment = {message.message}></Comment>
                ))
            }
            </div>
            <AddMessage threadId={props.thread.id} handleMessageAdded={handleMessageAdded} stompClient={client}></AddMessage>
        </div>
    )
}

