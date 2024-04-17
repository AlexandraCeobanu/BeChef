
import { useEffect,useState } from "react";
import '../styles/recipesView.scss'
import { getRecipesByUserId } from "../services/recipe";
import RecipesView from "./RecipesView";
export default function UserRecipesView(props)
{
    const [recipes,setRecipes] = useState([]);
    useEffect(() => {
        getRecipesByUserId(props.viewedUserId)
        .then(
            (recipes) => {
                    setRecipes(recipes);
            }
        )
        .catch((error) =>
        {
            console.log(error);
        })
    },[]);

    return(
        <div className="recipes-view">
        <div className="title">
        <hr></hr>
        </div> 
        {recipes.length === 0 ? (<div className="no-recipes">
            <h1>No recipes</h1>
        </div>) : 
        <RecipesView recipes={recipes} loggedUserId = {props.loggedUserId} handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur}></RecipesView>
        }
        </div>
    )
}