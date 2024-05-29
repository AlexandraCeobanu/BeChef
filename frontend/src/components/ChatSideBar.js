import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
import AddMessage from "./AddMessage";
import { useEffect, useState, useRef } from "react";
import { getThreadMessages } from "../services/chat";
import { useStompClient } from "./WebSocketProvider";

export default function ChatSideBar(props) {
    const [messages, setMessages] = useState([]);
    const [messageAdded,setMessageAdded] = useState(false);
    const client = useStompClient();
    const messageContainerRef = useRef(null);

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
    const scrollToBottom = () => {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      };

    useEffect(() => {
        scrollToBottom();
      }, [messages]);

    useEffect (() => {
    if(client)
     {
        const subscription = client.subscribe(`/newMessage/${props.thread.id}`, function(message) {
                     const receivedMessage = JSON.parse(message.body)
                     console.log("am intrat aici")
                    if(receivedMessage.threadId === props.thread.id){
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    props.handleMessageAdded();
                }
                    });

        return () => {
                subscription.unsubscribe();
                    };
     }
    },[])


    return(
        <div className="sidebar">
            <TitleSideBar showThreadChat={props.showThreadChat} title={props.thread.topic} 
            subscribedThreads={props.subscribedThreads} threadId={props.thread.id} user={props.user}
             handleSubscribeThread ={props.handleSubscribeThread}></TitleSideBar>
            <div ref={messageContainerRef} className="messages">
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

