import UserBadge from "./UserBadge"
import MiniRecipe from "./MiniRecipe"
import "../styles/notification.scss";
export default function Notification(props){
    return(
        <div className = {props.notification.read === false ? "notification read-notification"  : "notification"}>
            <div className="without-image">
            <UserBadge userId={props.notification.senderId}></UserBadge>
            <p>{props.notification.message}</p>
            </div>
            {
             props.notification.receiverId !==null && 
            <MiniRecipe recipeId={props.notification.recipeId}></MiniRecipe>
            }
        </div>
    )
}