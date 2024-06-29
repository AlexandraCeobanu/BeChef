import UserBadge from "./UserBadge"

export default function Message(props)
{
    return(
        <div className="message-details">
            <UserBadge userId={props.userId}></UserBadge>
            <h6>{props.comment}</h6>
        </div>
    )
}