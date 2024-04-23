import SearchTopic from "./SearchTopic";
import ThreadChat from "./ThreadChat";
import "../styles/chat.scss";
import Header from "./Header";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function Chat()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [socket, setSocket]  = useState(null);
    useEffect(()=> {
        if(socket === null){
        const newSocket = io('http://localhost:8082'); 
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
    }
    },[])
    useEffect(() => 
    {
        if(socket!==null)
        socket.emit('connection', user.id);
    },[socket,user.id])
    return(
        <div>
            <Header socket={socket}></Header>
        <div className="chat">
            <SearchTopic></SearchTopic>
            <ThreadChat></ThreadChat>
            <ThreadChat></ThreadChat>
            <ThreadChat></ThreadChat>
        </div>
        </div>
    )
}