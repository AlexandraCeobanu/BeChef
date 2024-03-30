import Recipie from "./Recipe"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import '../styles/recipesView.scss'
import { getRecipeImage } from "../services/getRecipeImage";
import RecipeView from "../components/RecipeView";
export default function RecipesView({recipes,userId,handleChangeLikes,handleBlur})
{
    const [viewRecipe,setViewRecipe] = useState(false);
    const [clickedRecipe,setClickedRecipe] = useState(null);
    const navigate = useNavigate();
    const [recipesImages,setRecipesImages] = useState([]);
    const handleViewRecipe = (index) => {
            setViewRecipe(true);
            setClickedRecipe(index);
            handleBlur(true);
    }
    useEffect(() => {
        const fetchRecipesImages = async () => {
            try {
                const promises = recipes.map(recipe => getRecipeImage(recipe.id));
                const images = await Promise.all(promises);
                const newRecipesImages = images.map(image => URL.createObjectURL(image));
                setRecipesImages(newRecipesImages);
            } catch (error) {
                console.error('Eroare la preluarea imaginilor:', error);
            }
        };
    
        fetchRecipesImages();
    }, [recipes]);


    return(
        <div>
        {viewRecipe === true && <RecipeView recipe={recipes[clickedRecipe]} image={recipesImages[clickedRecipe]} userId={userId} index={clickedRecipe} onClick={handleViewRecipe} handleChangeLikes={handleChangeLikes} ></RecipeView>}
      <div className={viewRecipe ===true ? "blur recipes-grid" : "recipes-grid"}>
            {recipesImages.map((recipeImage,index) => (    
                <div key={index}>
                <Recipie image={recipeImage} recipe={recipes[index]} index={index} userId={userId} onClick={handleViewRecipe} handleChangeLikes={handleChangeLikes}></Recipie>
            </div>
        )
            )}
        </div>
        </div>
        )
}