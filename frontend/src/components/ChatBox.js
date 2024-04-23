import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"
import Comment from "./Comment"
export default function ChatBox()
{
    return(
        <div className="chat-box">
            <div className="messages">
            <FontAwesomeIcon icon={faRocketchat}></FontAwesomeIcon>
            <p>45</p>
            </div>
            <Comment></Comment>
        </div>
    )
}