import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
import Header from "./Header";
import "../styles/home.scss"
import { getAllRecipes } from "../services/recipe";
import RecipesView from "./RecipesView";
import { getRecipesByName } from "../services/recipe";
export default function Home()
{
    const [search,setSearch] = useState(null);
    const [recipes,setRecipes] = useState([]);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [blur, setBlur] = useState(false);
    const location = useLocation();
    const [socket, setSocket]  = useState( location.state);
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
                setRecipes(response.reverse())
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
                    setRecipes(response.reverse());
            })
            .catch((error)=>
            {
                console.log(error);
        })
        },[location.key]
    )
    const handleBlur = (value)=>{
        setBlur(value);
    }
    return(
        <div className="home">
            <div className={blur === true ? "blur" : ""}>
            <Header socket={socket}></Header>
            </div>
            <div id="search-bar" className={blur === true ? "blur" : ""}>
            <input type="text" id="search" name="search" onChange={searchChangeHandler}  onKeyDown={handleKeyDown} placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop" />
             </div>
             <hr></hr>
             <div className="recipes">
             {recipes.length !==0 && <RecipesView socket={socket} recipes = {recipes} loggedUserId = {user.id} viewedUserId={user.id} handleBlur={handleBlur}></RecipesView>}
             </div>
        </div>
    )
}