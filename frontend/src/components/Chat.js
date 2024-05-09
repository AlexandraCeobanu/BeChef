import SearchTopic from "./SearchTopic";
import ThreadChat from "./ThreadChat";
import "../styles/chat.scss";
import Header from "./Header";
import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSideBar";
import { getAllThreads,getSubscribedThreads } from "../services/chat";
import { useStompClient } from "./WebSocketProvider";
import { useLocation } from "react-router-dom";
export default function Chat()
{
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [data , setData]=useState(location.state);
    const [sidebar,setSidebar] = useState(data!== null ? data.sidebar : false);
    const [showThreadId, setShowThreadId] = useState(data!== null ? data.thread : null);
    const [threads,setThreads] = useState([]);
    const [topicAdded,setAddedTopic] = useState(false);
    const [messageAdded,setMessageAdded] = useState(false);
    const [subscribedThreads,setSubscribedThreads] = useState([]);
    const [subscribeThread,setSubscribeThread] = useState(false);
    const client = useStompClient();
    const ShowThreadChat = (value) => {
        if(sidebar === false)
        {setSidebar(true);
            setData(null);
        setShowThreadId(value)
        }
        else
        {setSidebar(false);
            setShowThreadId(null);
        }
    }
    useEffect(()=> {
        setSidebar(data.sidebar);
        setShowThreadId(data.thread);
    },[location.state])

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
    useEffect(()=> {
        getSubscribedThreads(user.id)
        .then((response) => {
            setSubscribedThreads(response);
        })
        .catch((error)=> {
            console.log(error);
        })
    },[subscribeThread])

    const handleSubscribeThread=(value)=>{
        setSubscribeThread(value);
    }

    useEffect (() => {
        if(client)
         {
            const subscription = client.subscribe(`/newMessage`, function(message) {
                        handleMessageAdded();});
    
            return () => {
                    subscription.unsubscribe();
                        };
         }
        },[client])
    return(
        <div>
            <Header></Header>
        <div className={sidebar === true ? "display-sidebar chat" : "chat"}>
            <SearchTopic handleAddTopic = {handleAddTopic}></SearchTopic>
            {
                threads.map((thread,index)=> (
                    <ThreadChat key={index} thread = {thread} index={index} showThreadChat={ShowThreadChat} ></ThreadChat>
                ))
            }
        </div>
        {sidebar === true && <ChatSidebar showThreadChat={ShowThreadChat} thread={data!==null ? showThreadId : threads[showThreadId]}
        subscribedThreads={subscribedThreads} handleMessageAdded={handleMessageAdded} user={user} 
        handleSubscribeThread={handleSubscribeThread} ></ChatSidebar>}
        </div>
       
    )
}