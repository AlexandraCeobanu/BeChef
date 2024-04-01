import CommentsSection from "./CommentsSection";
import IngredientsView from "./IngredientsView";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Recipe from "./Recipe";
import StepsView from "./StepsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserBadge from "./UserBadge";
import { useState } from "react";
import { getRecipesByName } from "../services/recipe";
export default function RecipeView(props){
    const [recipe,setRecipe]  = useState(props.recipe)
    const handleCloseRecipe = () => {
        props.handleCloseRecipe();
    }
    const handleAddComment = ()=> {
        getRecipesByName(recipe.name)
        .then((response)=> {
            setRecipe(response)
        })
        .catch((error)=> {
            console.log(error);
        })
    }
    return(
        <div className="recipeView">
            <div className="close" onClick={handleCloseRecipe}>
            <FontAwesomeIcon icon={faXmark} className="icon"></FontAwesomeIcon>
            </div>
            <div className="left-side">
            <IngredientsView ingredients={props.recipe.ingredients}></IngredientsView>
            </div>
            <div className="right-side">
            <div className="right-side-top">
            <div className="right-side-top-left">
            <UserBadge userId={props.recipe.userId}></UserBadge>
            <Recipe image={props.image} recipe={recipe} index={props.index} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} onClick={props.onClick} handleChangeLikes={props.handleChangeLikes}></Recipe>
            </div>
            <CommentsSection recipe={props.recipe} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} handleAddComment={handleAddComment}></CommentsSection>
            </div>
            <StepsView steps={props.recipe.steps}></StepsView>
            </div>
        </div>
    )
}