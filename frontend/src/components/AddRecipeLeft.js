import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/addRecipe.scss"
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
export default function AddRecipeLeft({onDescriptionChange,onPostRecipe,onImageChange,image})
{
    const [description,setDescription] = useState("")
    const [recipePhoto,setRecipePhoto] = useState(null);

    const handleDescription = (event)=> {
        setDescription(event.target.value);
        onDescriptionChange(description);
    }
    const handlePostRecipe = () => {
        onPostRecipe();
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setRecipePhoto(file);
            if (file) {
                const formData = new FormData();
                formData.append('file',file);
                onImageChange(formData);
            }
       };
       const handleDefaultImageClick = () => {
        document.getElementById('file-input').click();
    };

    return(
        <div className="left">
            <div className="image">
                <input type="file" id="file-input" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }}></input>
                <div className="addImage">
                {recipePhoto === null ? 
                (<div><FontAwesomeIcon icon={faCirclePlus} className="fa fa-envelope fa-3x" id="plus" onClick={handleDefaultImageClick}></FontAwesomeIcon>
                <h3></h3></div>):
                (
        
                    <img src = {URL.createObjectURL(recipePhoto)} alt="Default"  onClick={handleDefaultImageClick} ></img>
                )
                }
                </div>
            </div>
            <div className="description">
               <textarea placeholder="Add a description"></textarea>
            </div>
            <button type="button" onClick={handlePostRecipe}>Post Recipe</button>
        </div>
    )
}