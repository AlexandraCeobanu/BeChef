import Recipe from "./Recipe"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import '../styles/recipesView.scss'
import { getRecipeImage } from "../services/getRecipeImage";
import RecipeView from "../components/RecipeView";
import { getUserById } from "../services/user/getUserById";
export default function RecipesView({recipes,loggedUserId,handleChangeLikes,handleBlur,handleRemoveSavedRecipe,handleGoToShoppingList,
    nrLikes,profile, recipeDeleted,collectionId})
{
    const [viewRecipe,setViewRecipe] = useState(false);
    const [clickedRecipe,setClickedRecipe] = useState(null);
    const [viewedUser,setViewedUser] =  useState(null);
    const [recipesImages,setRecipesImages] = useState([]);
   
    const handleViewRecipe = (index) => {
            setViewRecipe(true);
            setClickedRecipe(index);
            handleBlur(true);
    }
    const handleCloseRecipe = () => {
        setViewRecipe(false);
        handleBlur(false);
}
const handleToShoppingList = () => {
    setViewRecipe(false);
        handleBlur(false);
    handleGoToShoppingList();
}
useEffect(() => {
    if(clickedRecipe != null) {
    getUserById(recipes[clickedRecipe].userId)
    .then((user) => {
        setViewedUser(user);
    })
    .catch((error)=> {console.log(error)})}
},[clickedRecipe])

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

    const handleRemoveSavedRecipe2 = (id) =>{
        handleRemoveSavedRecipe(id);
    }
    return(
        <>
        {

        viewRecipe === true && viewedUser !== null  && <RecipeView recipe={recipes[clickedRecipe]}
          image={recipesImages[clickedRecipe]} loggedUserId={loggedUserId} viewedUserId={viewedUser.id}
          index={clickedRecipe} onClick={handleViewRecipe} handleCloseRecipe ={handleCloseRecipe} 
          handleChangeLikes={handleChangeLikes} handleRemoveSavedRecipe={handleRemoveSavedRecipe} handleRemoveSavedRecipe2={handleRemoveSavedRecipe2} collectionId = {collectionId}
          handleGoToShoppingList = {handleToShoppingList}  nrLikes ={nrLikes}
           ></RecipeView>}

      <div className={viewRecipe === true ? "blur recipes-grid" : "recipes-grid"}>
            {recipesImages.map((recipeImage,index) => (    
                <div key={index}>
                <Recipe profile={profile} image={recipeImage} recipe={recipes[index]} index={index} loggedUserId={loggedUserId} 
                 onClick={handleViewRecipe} handleChangeLikes={handleChangeLikes} recipeDeleted = {recipeDeleted} collectionId = {collectionId}> </Recipe>
            </div>
        )
            )}
        </div>

        
         </>
        )
}