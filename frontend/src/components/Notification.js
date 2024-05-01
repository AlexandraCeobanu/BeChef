import UserBadge from "./UserBadge"
import MiniRecipe from "./MiniRecipe"
import "../styles/notification.scss";
export default function Notification(props){
    return(
        <div>

            {
                props.notification.type !== "message" ? (
                    <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div className="without-image">
                    <UserBadge userId={props.notification.senderId}></UserBadge>
                    <p>{props.notification.message}</p>
                    </div>
                    <MiniRecipe recipeId={props.notification.recipeId}></MiniRecipe>
                    </div>
                ) : 
                (
                    <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
                    <div className="thread-notification">
                    <h6>Unde se coc cozonacii?</h6>
                    <div className="without-image">
                    <UserBadge userId={props.notification.senderId}></UserBadge>
                    <p>{props.notification.message}</p>
                    </div>
                    </div>
                    </div>
                )
            }
        </div>
    )
}