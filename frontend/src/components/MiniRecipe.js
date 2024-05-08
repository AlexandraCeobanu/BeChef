import { useEffect, useState } from "react"
import { getRecipeImage } from "../services/getRecipeImage"

export default function MiniRecipe(props){
    const [recipeImage, setRecipeImage] = useState("")
    useEffect(()=> {
        getRecipeImage(props.recipeId)
        .then((response)=> {
            if (response !== undefined && response !==""){
                const url = URL.createObjectURL(response)
                setRecipeImage(url);
            }
        })
        .catch((error)=> {console.log(error)})
    },[props.recipeId])

    const handleClickRecipe = ()=>{
        props.handleViewRecipe(props.index);
    }
    
    return (
        <div className="mini-recipe">
            <img src={recipeImage} alt="recipe" onClick={handleClickRecipe}></img>
        </div>
       
    )

}