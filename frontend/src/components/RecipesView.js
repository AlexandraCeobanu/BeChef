import Recipie from "./Recipie"
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import '../styles/recipesView.scss'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRecipeImage } from "../services/getRecipeImage";
import ProfileOptions from "./ProfileOptions";
export default function RecipesView({recipes})
{
    const navigate = useNavigate();
    const [recipesImages,setRecipesImages] = useState([]);
    const handleClick = () => {
        navigate("/addRecipe")
    };
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

    const handleAddRecipe =() => {
        navigate('/addRecipe');
    }

    return(
        <div className="recipes-view">
        <div className="title">
        {/* <h1>Recipes</h1> */}
        <ProfileOptions></ProfileOptions>
        <hr></hr>
        </div>
        <div id="new-recipe" onClick={handleAddRecipe}>
            <button>New recipe</button>
            <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleClick}></FontAwesomeIcon>
        </div>
        {recipes.length === 0 ? 
        (<div className="no-recipes">
        <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleClick}></FontAwesomeIcon>
        <h3>Add your first recipe today</h3>
        </div>) :
        (   <div className="recipes-grid">
            {recipesImages.map((recipeImage,index) => (    
                <div key={index}>
                <Recipie image={recipeImage}></Recipie>
            </div>
        )
            )}
            </div>
        )}
        </div>
    )
}