import CommentsSection from "./CommentsSection";
import IngredientsView from "./IngredientsView";
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {faBookmark as regularBookMark}  from '@fortawesome/free-regular-svg-icons';
import {faBookmark as solidBookMark}  from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import Recipe from "./Recipe";
import StepsView from "./StepsView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserBadge from "./UserBadge";
import { useState } from "react";
import { addIngredientsToShoppingList } from "../services/shoppingList";
import { getRecipesByName, saveRecipe, removeSaveRecipe,getUserSavedRecipes, addIngredients } from "../services/recipe";
import { getStockList } from "../services/stockList";
import SuccessfullyAddedIngredients from "./SuccessfullyAddedIngredients";
export default function RecipeView(props){
    const [recipe,setRecipe]  = useState(props.recipe)
    const [saved,setSaved] = useState(false);
    const [stockList,setStockList] = useState(null);
    const [ingredientsAdded,setIngredientsAdded] = useState(false);
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
    const handleAddIngredients = ()=> {
        addIngredientsToShoppingList(props.loggedUserId,props.recipe.ingredients)
        .then(()=> {
           setIngredientsAdded(true);
        })
        .catch((error)=> {
            console.log(error);
        })
    }
    const handleCloseSuccessfully = ()=> {
        setIngredientsAdded(false);
    }
    const handleGoToShoppingList =() =>{
        setIngredientsAdded(false);
        props.handleGoToShoppingList();
    }
    const handleSaveRecipe=()=> {
        if (saved === false) {
        saveRecipe(props.loggedUserId,recipe.id)
        .then(()=> {
           
        })
        .catch((error)=> {
            console.log(error);
        }) }
        else
        {
            removeSaveRecipe(props.loggedUserId,recipe.id)
            .then(()=> {
                if (props.handleRemoveSavedRecipe !== undefined)
                    {
                    props.handleRemoveSavedRecipe();}
                    props.handleCloseRecipe();
            })
            .catch((error)=> {
                console.log(error);
        })
        }
        setSaved(!saved);
    }
    useEffect(()=> {
        getUserSavedRecipes(props.loggedUserId)
        .then((response)=> {
            if (response.some(saved => saved.id === props.recipe.id) === true)
                    setSaved(true)})
        .catch((error)=> {
            console.log(error);
        })
        getStockList(props.loggedUserId)
            .then((response)=> 
            {
                setStockList(response);
            })
            .catch((error)=> {
                console.log(error);
            })
    },[])
    return(
        <div className="recipeView">
            <div className="close" onClick={handleCloseRecipe}>
            <FontAwesomeIcon icon={faXmark} className="icon"></FontAwesomeIcon>
            </div>
            <div className="left-side">
            {saved === false &&  
            <FontAwesomeIcon beat icon={regularBookMark} className="icon save" onClick={handleSaveRecipe}></FontAwesomeIcon> }
           {saved === true &&  
            <FontAwesomeIcon  icon={solidBookMark} className="icon save" onClick={handleSaveRecipe}></FontAwesomeIcon> }
            <IngredientsView ingredients={props.recipe.ingredients} stockList={stockList}></IngredientsView>
            <div className="button">
            <button type="button" onClick={handleAddIngredients}>Add to your shopping list</button>
            </div>
            </div>
            <div className="right-side">
            <div className="right-side-top">
            <div className="right-side-top-left">
            <UserBadge userId={props.recipe.userId}></UserBadge>
            <Recipe socket={props.socket} image={props.image} recipe={recipe} index={props.index} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} onClick={props.onClick} handleChangeLikes={props.handleChangeLikes}></Recipe>
            </div>
            <CommentsSection recipe={props.recipe} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} handleAddComment={handleAddComment}></CommentsSection>
            </div>
            <StepsView steps={props.recipe.steps}></StepsView>
            </div>
            {ingredientsAdded === true && <SuccessfullyAddedIngredients handleCloseSuccessfully = {handleCloseSuccessfully} handleGoToShoppingList={handleGoToShoppingList}></SuccessfullyAddedIngredients>}
        </div>
    )
}