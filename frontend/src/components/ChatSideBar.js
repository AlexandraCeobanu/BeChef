import TitleSideBar from "./TitleSideBar";
import Comment from "./Comment";
import AddMessage from "./AddMessage";
import { useEffect, useState } from "react";
import { getThreadMessages } from "../services/chat";
import {over} from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

export default function ChatSideBar(props) {
    const [messages, setMessages] = useState([]);
    const [messageAdded,setMessageAdded] = useState(false);
    const [socket, setSocket] = useState(null);
    const [stompClient ,setStompClient]  = useState(null);
    let sc =null;
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
        const socket2 = new SockJS('http://localhost:8081/ws');
        if(socket2!==null){
        sc = over(socket2);
        sc.connect({}, function(frame) {
            console.log('Conectat la server WebSocket');
            setStompClient(sc);
            sc.subscribe(`/newMessage`, function(message) {
            setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
              props.handleMessageAdded();
             
            });
        }) 
        return () => {
            if (sc !== null && sc.connected) {
                sc.disconnect();
                console.log('Deconectat de la server WebSocket');
            }
        };
    }
    },[])

   

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
            <AddMessage threadId={props.thread.id} handleMessageAdded={handleMessageAdded} stompClient={stompClient}></AddMessage>
        </div>
    )
}

