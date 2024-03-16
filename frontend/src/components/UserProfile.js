import Header from "./Header"
import RecipesView from "./RecipesView"
import UserDescription from "./UserDescription"
import "../styles/userProfile.scss"
export default function UserProfile()
{
    return(
        <div className="user-profile">
            <Header></Header>
            <div className="user-info">
            <div className="fixed-description">
            <UserDescription></UserDescription>
            </div>
            <RecipesView></RecipesView>
            </div>
        </div>
    )
}