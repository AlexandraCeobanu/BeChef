import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import "../styles/addRecipe.scss"
export default function AddRecipeRight()
{
    return(
        <div className="right">
            <div className="title">
            <h1>Recipes</h1>
            <hr></hr>
            </div>
            <div className="steps">
            <div className="addStep">
                <h2>Steps</h2>
                <FontAwesomeIcon icon={faCirclePlus}></FontAwesomeIcon>
            </div>
            </div>
        </div>
    )
}