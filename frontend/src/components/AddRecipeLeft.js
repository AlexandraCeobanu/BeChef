import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/addRecipe.scss"
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
export default function AddRecipeRight()
{
    return(
        <div className="left">
            <div className="image">
                <div className="addImage">
                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
                <h3>Add a image</h3>
                </div>
            </div>
            <div className="description">
                <textarea placeholder="Add a description"></textarea>
            </div>
            <button type="button">Post Recipe</button>
        </div>
    )
}