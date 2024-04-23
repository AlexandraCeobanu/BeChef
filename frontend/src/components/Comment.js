import UserBadge from "./UserBadge"

export default function Comment(props)
{
    return(
        <div className="comment-details">
            {/* <UserBadge userId={props.userId}></UserBadge> */}
            <UserBadge></UserBadge>
            {/* <h6>{props.comment}</h6> */}
            <h6>: E adevarat</h6>
        </div>
    )
}