import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import "../styles/addRecipe.scss"
export default function AddRecipeRight()
{
    const [addStep,setAddStep] = useState(false);
    const [steps,setSteps] = useState([]);
    const [recipeName,setRecipeName] = useState("");
    const handleRecipeName = (event)  =>{
        setRecipeName(event.target.value);
    }
    const handleClick =() => {
        setSteps([...steps, ""]);
    }
    const handleChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
      };
    const handleRemove = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1); 
        setSteps(newSteps);
    }

    return(
        <div className="right">
            <div className="title">
            <input type="text" value={recipeName}  placeholder="Type Recipe Name"  onChange={handleRecipeName}></input>
            <hr></hr>
            </div>
            <div className="steps">
            <div className="addStep">
                <h2>Steps</h2>
                <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleClick}></FontAwesomeIcon>
            </div>
            {steps.map((step, index) => (
        <div key={index}>
            <div className="remove-step">
            <h3>Pas {index+1} </h3>
            <FontAwesomeIcon icon={faMinus} className="icons" onClick={() => handleRemove(index)}></FontAwesomeIcon>
            </div>
          <textarea placeholder="Step Description" value={step} className="step"
          onChange={(e) => handleChange(index, e.target.value)}
          ></textarea>
        </div>
      ))}
            </div>
        </div>
    )
}