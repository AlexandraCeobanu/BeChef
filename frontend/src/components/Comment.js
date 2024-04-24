import UserBadge from "./UserBadge"

export default function Comment(props)
{
    return(
        <div className="comment-details">
            <UserBadge userId={props.userId}></UserBadge>
            <h6>{props.comment}</h6>
            
        </div>
    )
}