import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCirclePlus,faMinus} from '@fortawesome/free-solid-svg-icons';
import { TimePicker } from "antd";
import { useState } from "react";
import dayjs from 'dayjs';
import "../styles/addRecipe.scss"
import Filter from "./Filter";
import {Input} from "antd";
export default function AddRecipeRight({onRecipeStepChange})
{
    const [steps,setSteps] = useState([
        {recipeIndex: 1, description: "" },
        {recipeIndex: 2, description: "" }
    ]);
    const [recipeName,setRecipeName] = useState("");
    const [ingredients,setIngredients] = useState([
        {name: "", quantity: "" },
        {name: "", quantity: ""},
        {name: "", quantity: ""}
    ]);
    const [type, SetType] = useState(1)
    const [time, setTime] = useState(dayjs('01:00:00', 'HH:mm:ss'));
    

    const handleRecipeName = (event)  =>{
        setRecipeName(event.target.value);
        onRecipeStepChange(recipeName, steps,ingredients,type,time);

    }
    const handleClick =() => {
        setSteps([...steps,{recipeIndex: "", description: "" } ]);
    }
    const handleChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = { recipeIndex: index, description: value };
        setSteps(newSteps);
        onRecipeStepChange(recipeName, steps,ingredients, type,time);
      };

    const handleRemove = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1); 
        setSteps(newSteps);
    }
    const handleAddIngredient = () => {
            setIngredients([...ingredients,{name: "",quantity:""}]);
    }
    const handleChangeIngredient = (index,value) =>{
        const newIngredients = [...ingredients];
        newIngredients[index] = {name: value};
        setIngredients(newIngredients);
        onRecipeStepChange(recipeName, steps,ingredients,type,time);
    }
    const handleChangeQuantity = (index,value) =>{
        const newIngredients = [...ingredients];
        newIngredients[index].quantity = value;
        setIngredients(newIngredients);
        onRecipeStepChange(recipeName, steps,ingredients,type,time);
    }

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1); 
        setIngredients(newIngredients);
    }

    const handleClickFilter=(value) => {
        SetType(value);
        onRecipeStepChange(recipeName, steps,ingredients, value,time);
    }
    
  
  const handleChangeTime = (newTime) => {
    setTime(newTime);
    onRecipeStepChange(recipeName, steps,ingredients, type, newTime);
  };

    return(
        <div className="right">
            <div className="title">
            <input type="text" value={recipeName}  placeholder="Type Recipe Name"  onChange={handleRecipeName}></input>
            <hr></hr>
            </div>
            <div className="time-types">
            <div className="time-p">
           
            <TimePicker className="time-picker" showNow={false} value ={time} onChange={handleChangeTime}/>
           
            </div>
            <div className="types">
                <Filter text= {"Meat"} clicked={type === 1 ? true : false} filter={1} handleClickFilter={handleClickFilter}></Filter>
                <Filter text= {"Fish"} clicked={type === 2 ? true : false} filter={2} handleClickFilter={handleClickFilter}></Filter>
                <Filter text= {"Pasta"} clicked={type === 3 ? true : false} filter={3} handleClickFilter={handleClickFilter}></Filter>
                <Filter text= {"Salad"} clicked={type === 4 ? true : false} filter={4} handleClickFilter={handleClickFilter}></Filter>
                <Filter text= {"Dessert"} clicked={type === 5 ? true : false} filter={5} handleClickFilter={handleClickFilter}></Filter>
                <Filter text= {"Other"} clicked={type === 6 ? true : false} filter={6} handleClickFilter={handleClickFilter}></Filter>
            </div>
            </div>
            <div className="elements">
            <div className="ingredients">
                <div className="addIngredient">
               <h1>Ingredients</h1>
               <FontAwesomeIcon icon={faCirclePlus} className="icons" onClick={handleAddIngredient}></FontAwesomeIcon>
               </div>
               {ingredients.map((ingredient,index) => (
                <div key={index}>
                    {/* <ul>
                    <div className="remove-ingredient">

                    <li><input type="text" placeholder={"ingredient "+ (index+1)} value={ingredient.name} onChange={(e) => handleChangeIngredient(index, e.target.value)}></input>
                    <input type="text" placeholder="quantity" id="quantity" value={ingredient.quantity} onChange={(e) => handleChangeQuantity(index, e.target.value)}></input>
                    </li>
                    <FontAwesomeIcon icon={faMinus} className="icons" onClick={() => handleRemoveIngredient(index)}></FontAwesomeIcon>
                    </div>
                    </ul> */}
                    <div className='remove-ingredient'>
                    <Input className='newList'  placeholder={"ingredient " + (index+1)} value={ingredient.name} onChange={(e) => handleChangeIngredient(index, e.target.value)}></Input>
                    <Input id="quantity"  placeholder={"quantity"} value={ingredient.quantity} onChange={(e) => handleChangeQuantity(index, e.target.value)} ></Input>
                    <FontAwesomeIcon icon={faMinus} className="icons" onClick={() => handleRemoveIngredient(index)}></FontAwesomeIcon>
                    </div>
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