import UserBadge from "./UserBadge"
import MiniRecipe from "./MiniRecipe"
import "../styles/notification.scss";
export default function Notification(){
    return(
        <div className="notification">
            <UserBadge userId={3}></UserBadge>
            <p>liked your recipe</p>
            <MiniRecipe></MiniRecipe>
        </div>
    )
}