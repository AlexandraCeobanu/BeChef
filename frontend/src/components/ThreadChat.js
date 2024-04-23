import ChatBox from "./ChatBox"
import UserBadge from "./UserBadge"
export default function ThreadChat(props)
{
    return (
        <div className="thread">
            <div className="info">
            <UserBadge></UserBadge>
            <h4>Cozonaci</h4>
            </div>
            <ChatBox showThreadChat ={props.showThreadChat}></ChatBox>
        </div>
    )
}