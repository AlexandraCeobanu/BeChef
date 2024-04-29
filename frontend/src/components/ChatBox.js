import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"
import Comment from "./Comment"
export default function ChatBox(props)
{
    const handleClick = () => {
        props.showThreadChat(props.index);
    }
    return(
        <div className="chat-box" onClick = {handleClick}>
            <div className="messages">
            <FontAwesomeIcon icon={faRocketchat}></FontAwesomeIcon>
            <p>{props.thread.nrMessages}</p>
            </div>
            {
                props.thread.lastMessage !== null && props.thread.nrMessages!==0 && (
                    <Comment userId = {props.thread.lastMessage.senderId} comment ={props.thread.lastMessage.message}></Comment>
                ) 
               
            }
          
        </div>

    )
}