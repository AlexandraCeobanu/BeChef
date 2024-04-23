import SearchTopic from "./SearchTopic";
import ThreadChat from "./ThreadChat";
import "../styles/chat.scss";
import Header from "./Header";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatSidebar from "./ChatSideBar";
import { getAllThreads } from "../services/chat";
export default function Chat()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [socket, setSocket]  = useState(null);
    const [sidebar,setSidebar] = useState(false);
    const [threads,setThreads] = useState([]);
    const ShowThreadChat = () => {
        if(sidebar === false)
        setSidebar(true);
        else
        setSidebar(false);
    }
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

    useEffect(()=> {
       getAllThreads()
       .then((response)=> {
        setThreads(response);
        console.log(response);
       })
    },[])
    return(
        <div>
            <Header socket={socket}></Header>
        <div className={sidebar === true ? "display-sidebar chat" : "chat"}>
            <SearchTopic></SearchTopic>
            {
                threads.map((thread,index)=> (
                    <ThreadChat key={index} thread = {thread} showThreadChat={ShowThreadChat}></ThreadChat>
                ))
            }
            {/* <ThreadChat showThreadChat={ShowThreadChat}></ThreadChat>
            <ThreadChat showThreadChat={ShowThreadChat}></ThreadChat>
            <ThreadChat showThreadChat={ShowThreadChat}></ThreadChat> */}
        </div>
        {sidebar === true && <ChatSidebar showThreadChat={ShowThreadChat} ></ChatSidebar>}
        </div>
       
    )
}