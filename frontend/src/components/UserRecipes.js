
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
import SavedRecipes from "./SavedRecipes";
export default function UserRecipes(props)
{
    const [recipes,setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([])
    const [option,setOption] = useState(1);
    const [checkedItem,setCheckedItem] = useState(false);
    const [addedItem,setAddedItem] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getRecipesByUserId(props.loggedUserId)
        .then(
            (recipes) => {
                    setRecipes(recipes.reverse());
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
                    setSavedRecipes(recipes.reverse());
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
                    setSavedRecipes(recipes.reverse());
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
    const handleAddedItem=() =>
    {
        setAddedItem(!addedItem);
    }
    const handleGoToShoppingList=()=> {
       
        setOption(3);
    }
    const handleRecipeDeleted = ()=>{
        getRecipesByUserId(props.loggedUserId)
        .then(
            (recipes) => {
                    setRecipes(recipes.reverse());
            }
        )
        .catch((error) =>
        {
            console.log(error);
        })
    }
    return(
        <div className="recipes-view">
        <div className="title">
        <ProfileOptions handleOption= {handleOption} option={option}></ProfileOptions>
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
            <RecipesView profile="true" recipes={recipes} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} handleChangeLikes={props.handleChangeLikes}
             handleBlur={props.handleBlur} handleGoToShoppingList={handleGoToShoppingList} nrLikes ={props.nrLikes} recipeDeleted={handleRecipeDeleted}
             ></RecipesView>
        )}

        {option === 2 &&
            (   
                option === 2 &&
                // <RecipesView recipes={savedRecipes} handleRemoveSavedRecipe={handleRemoveSavedRecipe} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId}
                //  handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur} handleGoToShoppingList={handleGoToShoppingList}
                //  nrLikes ={props.nrLikes}></RecipesView>
                <SavedRecipes userId ={props.loggedUserId} savedRecipes={savedRecipes} handleRemoveSavedRecipe={handleRemoveSavedRecipe}
                viewedUserId={props.viewedUserId} handleChangeLikes={props.handleChangeLikes} handleBlur={props.handleBlur} handleGoToShoppingList={handleGoToShoppingList}
                nrLikes = {props.nrLikes}
                ></SavedRecipes>
            )
        }
        {
            option === 3 && <div className="lists">
            <ShoppingList  userId={props.loggedUserId} handleCheckedItem={handleCheckedItem} addedItem={addedItem}></ShoppingList>
            <StockList userId={props.loggedUserId} checkedItem={checkedItem} handleAddedItem ={handleAddedItem}></StockList>
            </div>
        }
        </div>
    )
}