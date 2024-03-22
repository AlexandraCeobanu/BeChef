import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "../styles/addRecipe.scss"
export default function AddRecipeRight({onRecipeStepChange})
{
    const [steps,setSteps] = useState([
        {recipeIndex: 1, description: "" },
        {recipeIndex: 2, description: "" }
    ]);
    const [recipeName,setRecipeName] = useState("");
    const [ingredients,setIngredients] = useState([
        {name: "" },
        {name: "" },
        {name: ""}
    ]);
    const handleRecipeName = (event)  =>{
        setRecipeName(event.target.value);
        onRecipeStepChange(recipeName, steps,ingredients);

    }
    const handleClick =() => {
        setSteps([...steps,{recipeIndex: "", description: "" } ]);
    }
    const handleChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = { recipeIndex: index, description: value };
        setSteps(newSteps);
        onRecipeStepChange(recipeName, steps,ingredients);
      };

    const handleRemove = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1); 
        setSteps(newSteps);
    }
    const handleAddIngredient = () => {
            setIngredients([...ingredients,{name: ""}]);
    }
    const handleChangeIngredient = (index,value) =>{
        const newIngredients = [...ingredients];
        newIngredients[index] = {name: value};
        setIngredients(newIngredients);
        onRecipeStepChange(recipeName, steps,ingredients);
    }

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1); 
        setIngredients(newIngredients);
    }


    return(
        <div className="right">
            <div className="title">
            <input type="text" value={recipeName}  placeholder="Type Recipe Name"  onChange={handleRecipeName}></input>
            <hr></hr>
            </div>
            <div className="elements">
            <div className="ingredients">
                <div className="addIngredient">
               <h1>Ingredients</h1>
               <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleAddIngredient}></FontAwesomeIcon>
               </div>
               {ingredients.map((ingredient,index) => (
                <div key={index}>
                    <ul>
                    <div className="remove-ingredient">
                    <li><input type="text" placeholder={"ingredient "+ (index+1)} value={ingredient.name} onChange={(e) => handleChangeIngredient(index, e.target.value)}></input></li>
                    <FontAwesomeIcon icon={faMinus} className="icons" onClick={() => handleRemoveIngredient(index)}></FontAwesomeIcon>
                    </div>
                    </ul>
                </div>
               )
               )}
            </div>
            <div className="steps">
            <div className="addStep">
                <h1>Steps</h1>
                <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleClick}></FontAwesomeIcon>
            </div>
            {steps.map((step, index) => (
        <div key={index}>
            <div className="remove-step">
            <h3>Pas {index+1} </h3>
            <FontAwesomeIcon icon={faMinus} className="icons" onClick={() => handleRemove(index)}></FontAwesomeIcon>
            </div>
          <textarea placeholder="Step Description" value={step.description} className="step"
          onChange={(e) => handleChange(index, e.target.value)}
          ></textarea>
        </div>
      ))}
            </div>
            </div>
        </div>
    )
}