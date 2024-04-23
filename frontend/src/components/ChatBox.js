import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"
import Comment from "./Comment"
export default function ChatBox(props)
{
    const handleClick = () => {
        props.showThreadChat();
    }
    return(
        <div className="chat-box" onClick = {handleClick}>
            <div className="messages">
            <FontAwesomeIcon icon={faRocketchat}></FontAwesomeIcon>
            <p>45</p>
            </div>
            <Comment></Comment>
        </div>
    )
}