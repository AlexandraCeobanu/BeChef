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
    const [showThreadId, setShowThreadId] = useState(null);
    const [threads,setThreads] = useState([]);
    const [topicAdded,setAddedTopic] = useState(false);
    const [messageAdded,setMessageAdded] = useState(false);
    const ShowThreadChat = (value) => {
        if(sidebar === false)
        {setSidebar(true);
        setShowThreadId(value)
        }
        else
        {setSidebar(false);
            setShowThreadId(null);
        }
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
        setThreads(response.reverse());
        setAddedTopic(false);
        setMessageAdded(false);
       })
    },[topicAdded,messageAdded])

    const handleAddTopic=()=>{
        setAddedTopic(true);
    }

    const handleMessageAdded =()=> {
        setMessageAdded(true);
    }
    return(
        <div>
            <Header socket={socket}></Header>
        <div className={sidebar === true ? "display-sidebar chat" : "chat"}>
            <SearchTopic handleAddTopic = {handleAddTopic}></SearchTopic>
            {
                threads.map((thread,index)=> (
                    <ThreadChat key={index} thread = {thread} index={index} showThreadChat={ShowThreadChat} ></ThreadChat>
                ))
            }
        </div>
        {sidebar === true && <ChatSidebar showThreadChat={ShowThreadChat} thread={threads[showThreadId]} handleMessageAdded={handleMessageAdded}></ChatSidebar>}
        </div>
       
    )
}