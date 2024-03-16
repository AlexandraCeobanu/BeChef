import Recipie from "./Recipie"
import '../styles/recipesView.scss'
export default function RecipesView()
{
    return(
        <div className="recipes-view">
        <div className="title">
        <h1>Recipes</h1>
        <hr></hr>
        </div>
        <div className="recipes-grid">
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
        </div>
        </div>
    )
}