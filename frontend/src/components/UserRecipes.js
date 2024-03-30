import Recipie from "./Recipie"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import '../styles/recipesView.scss'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRecipesByUserId } from "../services/recipe";
import ProfileOptions from "./ProfileOptions";
import RecipesView from "./RecipesView";
export default function UserRecipes(props)
{
    const [recipes,setRecipes] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getRecipesByUserId(props.id)
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

    const handleAddRecipe =() => {
        navigate('/addRecipe');
    }


    return(
        <div className="recipes-view">
        <div className="title">
        <ProfileOptions></ProfileOptions>
        <hr></hr>
        </div>
        {recipes.length !==0 &&
        <div id="new-recipe" onClick={handleAddRecipe}>
            <button>New recipe</button>
            <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleAddRecipe}></FontAwesomeIcon>
        </div>}
        {recipes.length === 0 ? 
        (<div className="no-recipes">
        <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleAddRecipe}></FontAwesomeIcon>
        <h3>Add your first recipe today</h3>
        </div>) :
        (   
            <RecipesView recipes={recipes} userId = {props.id}></RecipesView>
        )}
        </div>
    )
}