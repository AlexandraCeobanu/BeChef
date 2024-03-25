import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Header from "./Header";
import Recipie from "./Recipie";
import "../styles/home.scss"
import { getAllRecipes } from "../services/recipe";
import RecipesView from "./RecipesView";
export default function Home()
{
    const [search,setSearch] = useState(null);
    const [recipes,setRecipes] = useState([]);
    const searchChangeHandler=(event) =>{
        setSearch(event.target.value);
    }
    const handleKeyDown = (event) => {
        // if (event.key === 'Enter') {
        //   getAllRecipe()
        //   .then (
        //     (response) => {
        //         console.log(response);
        //         setBooks(response.works)
        //     }
        //   )
        //   .catch((error)=> {
        //     console.log(error);
        //   })
        // }
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
        },[]
    )
    return(
        <div className="home">
            <Header></Header>
            <div id="search-bar">
            <input type="text" id="search" name="search" onChange={searchChangeHandler}  onKeyDown={handleKeyDown} placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop" />
             </div>
             <hr></hr>
             {recipes.length !==0 && <RecipesView recipes = {recipes}></RecipesView>}

        </div>
    )
}