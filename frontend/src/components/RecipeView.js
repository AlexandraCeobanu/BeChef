import CommentsSection from "./CommentsSection";
import IngredientView from "./IngredientsView";
import Recipie from "./Recipie";
export default function RecipeView(){
    return(
        <div className="recipeView">
            <IngredientView></IngredientView>
            <Recipie></Recipie>
            <CommentsSection></CommentsSection>
        </div>
    )
}