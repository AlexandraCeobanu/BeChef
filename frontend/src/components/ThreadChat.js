import ChatBox from "./ChatBox"
import UserBadge from "./UserBadge"
export default function ThreadChat()
{
    return (
        <div>
            <UserBadge></UserBadge>
            <h4>Subiect</h4>
            <ChatBox></ChatBox>
        </div>
    )
}