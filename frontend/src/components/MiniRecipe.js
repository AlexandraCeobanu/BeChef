import { useEffect, useState } from "react"
import { getRecipeImage } from "../services/getRecipeImage"
import { useNavigate } from "react-router-dom"

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
        .catch((error)=> {console.log(error)})
    },[props.recipeId])

    const handleClickRecipe=()=> {
        navigate("/profile");
    }
    return (
        <div className="mini-recipe">
            <img src={recipeImage} alt="image" onClick={handleClickRecipe}></img>
        </div>
    )
}