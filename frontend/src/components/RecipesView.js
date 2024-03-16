import Recipie from "./Recipie"
import '../styles/recipesView.scss'
export default function RecipesView()
{
    return(
        <div className="recipes-grid">
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
        </div>
    )
}