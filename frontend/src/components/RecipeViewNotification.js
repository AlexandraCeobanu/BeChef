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
import { getRecipesByName, saveRecipe, removeSaveRecipe,getUserSavedRecipes,getRecipeById} from "../services/recipe";
import { getRecipeImage } from "../services/getRecipeImage";
import { getStockList } from "../services/stockList";
import SuccessfullyAddedIngredients from "./SuccessfullyAddedIngredients";
import { getUserById } from "../services/user/getUserById";
import { useLocation, useNavigate } from "react-router-dom";
import Step from "./Step";
export default function RecipeViewNotification(props){
   
    const [loggedUserId , setLoggedUserId] = useState(JSON.parse(localStorage.getItem("user")).id);
    const [viewedUserId, setViewedUser] = useState(null);
    const [recipe, setRecipe] = useState(null);
    const [saved,setSaved] = useState(false);
    const [stockList,setStockList] = useState(null);
    const [ingredientsAdded,setIngredientsAdded] = useState(false);
    const [recipeImage, setRecipeImage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const  data  = location.state;

    useEffect(()=> {
        getRecipeById(data.recipeId)
        .then((response) => {
            setRecipe(response);
        })
    },[])

    useEffect(()=> {
        getRecipeImage(data.recipeId)
        .then((response)=> {
            if (response !== undefined && response !==""){
                const url = URL.createObjectURL(response)
                setRecipeImage(url);
            }
        })
        .catch((error)=> {console.log(error)})
    },[])

    useEffect(() => {
         
        if(recipe!==null)
        getUserById(recipe.userId)
        .then((user) => {
            setViewedUser(user);
        })
        .catch((error)=> {console.log(error)})
    },[recipe])
    
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
        addIngredientsToShoppingList(loggedUserId,recipe.ingredients)
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
        // props.handleGoToShoppingList();
    }
    const handleSaveRecipe=()=> {
        if (saved === false) {
        saveRecipe(loggedUserId,recipe.id)
        .then(()=> {
           
        })
        .catch((error)=> {
            console.log(error);
        }) }
        else
        {
            removeSaveRecipe(loggedUserId,recipe.id)
            .then(()=> {    
            })
            .catch((error)=> {
                console.log(error);
        })
        }
        setSaved(!saved);
    }
    useEffect(()=> {
       
        getUserSavedRecipes(loggedUserId)
        .then((response)=> {
            if(recipe!==null)
            if (response.some(saved => saved.id === recipe.id) === true)
                    setSaved(true)})
        .catch((error)=> {
            console.log(error);
        })
        getStockList(loggedUserId)
            .then((response)=> 
            {
                setStockList(response);
            })
            .catch((error)=> {
                console.log(error);
            })
    },[recipe])
    const handleCloseViewRecipe = ()=>{
        navigate(-1);
        // if (location.state && location.state.from) {
        //     navigate(location.state.from);
        //   } else {
        //     navigate('/home');
        //   }
        
    }
    return(
        <div>
        {recipe !== null && 
        <div className="recipeView">
            <div className="close">
            <FontAwesomeIcon icon={faXmark} className="icon" onClick={handleCloseViewRecipe}></FontAwesomeIcon>
            </div>
            <div className="left-side">
            {saved === false &&  
            <FontAwesomeIcon beat icon={regularBookMark} className="icon save" onClick={handleSaveRecipe} ></FontAwesomeIcon> }
           {saved === true &&  
            <FontAwesomeIcon  icon={solidBookMark} className="icon save" onClick={handleSaveRecipe} ></FontAwesomeIcon> }
            {
            <IngredientsView ingredients={recipe.ingredients} stockList={stockList}></IngredientsView>
            }
            
            <div className="button">
            <button type="button" onClick={handleAddIngredients}>Add to your shopping list</button>
            </div>
            </div>
            <div className="right-side">
            <div className="right-side-top">
            <div className="right-side-top-left">
            <UserBadge userId={recipe.userId}></UserBadge>
            <Recipe  image={recipeImage} recipe={recipe} 
            loggedUserId={loggedUserId} viewedUserId={viewedUserId} nrLikes ={recipe.nrLikes} ></Recipe>
            </div>
            <CommentsSection  recipe={recipe} loggedUserId={loggedUserId} viewedUserId={viewedUserId} handleAddComment={handleAddComment}></CommentsSection>
            </div>
            {/* <StepsView steps={recipe.steps}></StepsView> */}
            <Step steps={recipe.steps}></Step>
            </div>
            {ingredientsAdded === true && <SuccessfullyAddedIngredients handleCloseSuccessfully = {handleCloseSuccessfully} handleGoToShoppingList={handleGoToShoppingList}></SuccessfullyAddedIngredients>}
        </div>}
        </div>
    )
}