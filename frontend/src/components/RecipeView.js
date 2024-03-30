import CommentsSection from "./CommentsSection";
import IngredientsView from "./IngredientsView";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Recipie from "./Recipe";
import StepView from "./StepView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
export default function RecipeView(props){
    const handleCloseRecipe = () => {
        props.handleCloseRecipe();
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
            <Recipie image={props.image} recipe={props.recipe} index={props.index} userId={props.userId} onClick={props.onClick} handleChangeLikes={props.handleChangeLikes}></Recipie>
            <CommentsSection></CommentsSection>
            </div>
            <StepView></StepView>
            <StepView></StepView>
            <StepView></StepView>
            <StepView></StepView>
            </div>
        </div>
    )
}