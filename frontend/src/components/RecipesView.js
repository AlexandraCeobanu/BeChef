import Recipie from "./Recipie"
import { useNavigate } from "react-router-dom";
import '../styles/recipesView.scss'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function RecipesView()
{
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/addRecipe")
    };

    return(
        <div className="recipes-view">
        <div className="title">
        <h1>Recipes</h1>
        <hr></hr>
        </div>
        <div className="no-recipes">
        <FontAwesomeIcon icon = {faCirclePlus} className="icons" onClick={handleClick}></FontAwesomeIcon>
        <h3>Add your first recipe today</h3>
        </div>
        <div className="recipes-grid">
            {/* <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie>
            <Recipie></Recipie> */}
        </div>
        </div>
    )
}