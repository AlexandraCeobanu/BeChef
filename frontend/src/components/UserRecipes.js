
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import '../styles/recipesView.scss'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRecipesByUserId, getUserSavedRecipes } from "../services/recipe";
import ProfileOptions from "./ProfileOptions";
import RecipesView from "./RecipesView";
import ShoppingList from "./ShoppingList";
import StockList from "./StockList";
export default function UserRecipes(props)
{
    const [recipes,setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([])
    const [option,setOption] = useState(1);
    const [checkedItem,setCheckedItem] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getRecipesByUserId(props.loggedUserId)
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

    useEffect(() => {
        getUserSavedRecipes(props.loggedUserId)
        .then(
            (recipes) => {
                    setSavedRecipes(recipes);
            }
        )
        .catch((error) =>
        {
            console.log(error);
        })
    },[option]);

    const handleAddRecipe =() => {
        navigate('/addRecipe');
    }

    const handleOption=(option) =>
    {
        setOption(option);
    }
    const handleRemoveSavedRecipe=() =>
    {
        getUserSavedRecipes(props.loggedUserId)
        .then(
            (recipes) => {
                    setSavedRecipes(recipes);
            }
        )
        .catch((error) =>
        {
            console.log(error);
        })
    }
    const handleCheckedItem=(value) =>
    {
        setCheckedItem(value);
    }
    return(
        <div className="recipes-view">
        <div className="title">
        <ProfileOptions handleOption= {handleOption}></ProfileOptions>
        <hr></hr>
        </div>
        {recipes.length !==0 && option === 1 &&
        <div id="new-recipe" onClick={handleAddRecipe}>
            <button>New recipe</button>
            <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleAddRecipe}></FontAwesomeIcon>
        </div>}
        {recipes.length === 0 && option === 1 ? 
        (<div className="no-recipes">
        <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleAddRecipe}></FontAwesomeIcon>
        <h3>Add your first recipe today</h3>
        </div>) :
        (   
            option === 1 &&
            <RecipesView recipes={recipes} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur}></RecipesView>
        )}

        {savedRecipes.length === 0 && option === 2 ?
            (<div className="no-recipes">
            <h1>No recipe saved</h1>
            </div>) :
            (   
                option === 2 &&
                <RecipesView recipes={savedRecipes} handleRemoveSavedRecipe={handleRemoveSavedRecipe} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur}></RecipesView>
            )
        }
        {
            option === 3 && <div className="lists">
            <ShoppingList  userId={props.loggedUserId} handleCheckedItem={handleCheckedItem}></ShoppingList>
            <StockList userId={props.loggedUserId} checkedItem={checkedItem}></StockList>
            </div>
        }
        </div>
    )
}