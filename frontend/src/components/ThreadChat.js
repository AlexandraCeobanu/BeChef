import ChatBox from "./ChatBox"
import UserBadge from "./UserBadge"
export default function ThreadChat(props)
{
    return (
        <div className="thread">
            <div className="info">
            <UserBadge userId={props.thread.initiatorId}></UserBadge>
            <h4>{props.thread.topic}</h4>
            </div>
            <ChatBox showThreadChat ={props.showThreadChat}></ChatBox>
        </div>
    )
}