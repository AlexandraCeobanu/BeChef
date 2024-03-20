import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/addRecipe.scss"
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
export default function AddRecipeLeft({onDescriptionChange,onPostRecipe})
{
    const [description,setDescription] = useState("")
    const handleDescription = (event)=> {
        setDescription(event.target.value);
        onDescriptionChange(description);
    }
    const handlePostRecipe = () => {
        onPostRecipe();
    }
    return(
        <div className="left">
            <div className="image">
                <div className="addImage">
                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                <h3>Add a image</h3>
                </div>
            </div>
            <div className="description">
                <textarea placeholder="Add a description" onChange={handleDescription}></textarea>
            </div>
            <button type="button" onClick={handlePostRecipe}>Post Recipe</button>
        </div>
    )
}