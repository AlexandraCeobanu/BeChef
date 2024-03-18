import Header from "./Header";
import AddRecipeLeft from "./AddRecipeLeft";
import AddRecipeRight from "./AddRecipeRight";
import "../styles/page.scss"
export default function AddRecipe()
{
    return(
        <div className="main-page">
            <Header></Header>
            <div className="without-header">
            <div className="fixed-side">
            <AddRecipeLeft></AddRecipeLeft>
            </div>
            <AddRecipeRight></AddRecipeRight>
            </div>
        </div>
    )
}