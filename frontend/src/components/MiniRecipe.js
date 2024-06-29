import { useEffect, useState } from "react"
import { getRecipeImage } from "../services/getRecipeImage"
import {useNavigate } from "react-router-dom";
export default function MiniRecipe(props){
    const [recipeImage, setRecipeImage] = useState("")
    const navigate = useNavigate();
    useEffect(()=> {
        getRecipeImage(props.recipeId)
        .then((response)=> {
            if (response !== undefined && response !==""){
                const url = URL.createObjectURL(response)
                setRecipeImage(url);
            }
        })
        .catch((error)=> {console.log(error)
            navigate('/error')

        })
    },[props.recipeId])

    const handleClickRecipe = ()=>{
        if(props.handleViewRecipe !== undefined)
        props.handleViewRecipe(props.index);
        if(props.handleSeeRecipe !== undefined)
            props.handleSeeRecipe();
    }
    
    return (
        <div className="mini-recipe">
            <img src={recipeImage} alt="recipe" onClick={handleClickRecipe}></img>
        </div>
       
    )

}