import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Recipie from "./Recipie";
import "../styles/home.scss"
import { getAllRecipes } from "../services/recipe";
import RecipesView from "./RecipesView";
import { getRecipesByName } from "../services/recipe";
export default function Home()
{
    const [search,setSearch] = useState(null);
    const [recipes,setRecipes] = useState([]);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const location = useLocation();
    const searchChangeHandler=(event) =>{
        setSearch(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          getRecipesByName(search)
          .then (
            (response) => {
                console.log(search)
                console.log(response)
                setRecipes(response)
            }
          )
          .catch((error)=> {
            console.log(error);
          })
        }
    };
    useEffect (
        ()=> {
            getAllRecipes()
            .then((response)=> {
                    setRecipes(response);
            })
            .catch((error)=>
            {
                console.log(error);
        })
        },[location.key]
    )
    return(
        <div className="home">
            <Header></Header>
            <div id="search-bar">
            <input type="text" id="search" name="search" onChange={searchChangeHandler}  onKeyDown={handleKeyDown} placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop" />
             </div>
             <hr></hr>
             <div className="recipes">
             {recipes.length !==0 && <RecipesView recipes = {recipes} userId = {user.id}></RecipesView>}
             </div>
        </div>
    )
}