import CommentsSection from "./CommentsSection";
import IngredientsView from "./IngredientsView";
import {faUpDownLeftRight, faXmark,faBars} from '@fortawesome/free-solid-svg-icons';
import {faBookmark as regularBookMark}  from '@fortawesome/free-regular-svg-icons';
import {faBookmark as solidBookMark}  from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";
import Recipe from "./Recipe";
import StepsView from "./StepsView";
import Step from "./Step";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserBadge from "./UserBadge";
import { useState } from "react";
import { addIngredientsToShoppingList } from "../services/shoppingList";
import { getRecipesByName, saveRecipe, removeSaveRecipe,getUserSavedRecipes} from "../services/recipe";
import { getStockList } from "../services/stockList";
import SuccessfullyAddedIngredients from "./SuccessfullyAddedIngredients";
import Collection from "./Collection";
import {useNavigate } from "react-router-dom";
export default function RecipeView(props){
    const [recipe,setRecipe]  = useState(props.recipe)
    const [saved,setSaved] = useState(false);
    const [clickedSaved, setClickedSaved] = useState(false);
    const [stockList,setStockList] = useState(null);
    const [ingredientsAdded,setIngredientsAdded] = useState(false);
    const [showIngredients,setShowIngredients] = useState(false);
    const navigate = useNavigate();
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
            navigate('/error')
        })
    }
    const handleAddIngredients = ()=> {
        addIngredientsToShoppingList(props.loggedUserId,props.recipe.id)
        .then(()=> {
           setIngredientsAdded(true);
        })
        .catch((error)=> {
            console.log(error);
            navigate('/error')
        })
    }
    const handleCloseSuccessfully = ()=> {
        setIngredientsAdded(false);
    }
    const handleGoToShoppingList =() =>{
        setIngredientsAdded(false);
        props.handleGoToShoppingList();
    }
    const closeViewCollections = () => {
        setClickedSaved(false);
    }
    const handleSaveRecipe=()=> {
        if (saved === false) {
        saveRecipe(props.loggedUserId,recipe.id)
        .then(()=> {
          setClickedSaved(true);
        })
        .catch((error)=> {
            console.log(error);
            navigate('/error')
        }) }
        else
        {
            removeSaveRecipe(props.loggedUserId,recipe.id)
            .then(()=> {
                if (props.handleRemoveSavedRecipe !== undefined)
                    {
                        if(props.collectionId !== undefined){
                            props.handleCloseRecipe();
                    props.handleRemoveSavedRecipe2(props.collectionId);}
                else
                    props.handleRemoveSavedRecipe();
                }
                    // props.handleCloseRecipe();
                    setClickedSaved(false);
                    
            })
            .catch((error)=> {
                console.log(error);
                navigate('/error')
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
            navigate('/error')
        })
        getStockList(props.loggedUserId)
            .then((response)=> 
            {
                setStockList(response);
            })
            .catch((error)=> {
                console.log(error);
                navigate('/error')
            })
    },[])
    const handleShowIngredients = () => {
        setShowIngredients(!showIngredients)
    }
    return(
        <>
        <div className="recipeView">
            <div className="close" onClick={handleCloseRecipe}>
            <FontAwesomeIcon icon={faXmark} className="icon"></FontAwesomeIcon>
            </div>
            <FontAwesomeIcon id="bars" className={showIngredients === true ? "back" : ""} icon={faBars} onClick={handleShowIngredients}></FontAwesomeIcon>
            {showIngredients === true && 
                <div className="show-ingredients">
                {saved === false &&  
                <FontAwesomeIcon beat icon={regularBookMark} className="icon save" onClick={handleSaveRecipe} ></FontAwesomeIcon> }
               {saved === true &&  
                <FontAwesomeIcon  icon={solidBookMark} className="icon save" onClick={handleSaveRecipe}></FontAwesomeIcon> }
                {<IngredientsView ingredients={props.recipe.ingredients} stockList={stockList}></IngredientsView>
                }
                </div>
            }
            <div className="left-side">
            <div className="ingredient-bar">
            {saved === false &&  
            <FontAwesomeIcon beat icon={regularBookMark} className="icon save" onClick={handleSaveRecipe}></FontAwesomeIcon> }
           {saved === true &&  
            <FontAwesomeIcon  icon={solidBookMark} className="icon save" onClick={handleSaveRecipe}></FontAwesomeIcon> }
            {<IngredientsView ingredients={props.recipe.ingredients} stockList={stockList}></IngredientsView>}
            <div className="button">
            <button type="button" onClick={handleAddIngredients}>Add to your shopping list</button>
            </div>
            </div>
            </div>
            <div className="right-side">
            <div className="right-side-top">
            <div className="right-side-top-left">
            <UserBadge userId={props.recipe.userId}></UserBadge>
            <Recipe  image={props.image} recipe={recipe} index={props.index} 
            loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} onClick={props.onClick} 
            handleChangeLikes={props.handleChangeLikes} nrLikes ={props.nrLikes}></Recipe>
            </div>
            <CommentsSection  recipe={props.recipe} loggedUserId={props.loggedUserId} viewedUserId={props.viewedUserId} handleAddComment={handleAddComment}></CommentsSection>
            </div>
            {props.recipe.description !== ""  && 
            <div id="description">
            <h4>Description</h4>
            <p>{props.recipe.description}
            </p>
            </div>
            }
            
            
            {/* <StepsView steps={props.recipe.steps}></StepsView> */}
            <Step steps={props.recipe.steps}></Step>
            </div>
            {ingredientsAdded === true && <SuccessfullyAddedIngredients handleCloseSuccessfully = {handleCloseSuccessfully} handleGoToShoppingList={handleGoToShoppingList}></SuccessfullyAddedIngredients>}
        </div>
        {clickedSaved === true && 
        <Collection userId={props.loggedUserId} recipeId={props.recipe.id} closeViewCollections={closeViewCollections}></Collection>
        }
        
        </>
    )
}