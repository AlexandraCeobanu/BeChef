import CommentsSection from "./CommentsSection";
import IngredientsView from "./IngredientsView";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import Recipie from "./Recipie";
import StepView from "./StepView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RecipeView(){
    return(
        <div className="recipeView">
            <div className="close">
            <FontAwesomeIcon icon={faXmark} className="icon"></FontAwesomeIcon>
            </div>
            <div className="left-side">
            <IngredientsView></IngredientsView>
            </div>
            <div className="right-side">
            <div className="right-side-top">
            <Recipie></Recipie>
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