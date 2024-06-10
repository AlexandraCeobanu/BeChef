import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useLocation,useNavigate } from "react-router-dom";
import Header from "./Header";
import "../styles/home.scss"
import { getAllRecipes } from "../services/recipe";
import RecipesView from "./RecipesView";
import { getRecipesByName, getRecipesByFilter } from "../services/recipe";
import Filters from "./Filters";
import dayjs from 'dayjs';
export default function Home()
{
    const [search,setSearch] = useState("");
    const [recipes,setRecipes] = useState([]);
    const [filteredRecipes,setFilteredRecipes] = useState([])
    const [appliedFilter,setAppliedFilter] = useState(null)
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [blur, setBlur] = useState(false);
    const location = useLocation();
    const [allFilter,setAllFilter] = useState(true);
    const [changedNrLikes,setChangedNrLikes] = useState(false);
    const searchChangeHandler=(event) =>{
        setSearch(event.target.value);
    }
    const navigate = useNavigate();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          getRecipesByName(search)
          .then (
            (response) => {
                setRecipes(response.reverse())
                setAppliedFilter(null);
            }
          )
          .catch((error)=> {
            console.log(error);
            navigate('/error')
          })
        }
    };
    const handleChangeLikes = ()=>{
      setChangedNrLikes(true);
   }
    useEffect (
        ()=> {
            getAllRecipes()
            .then((response)=> {
             
                    setAppliedFilter(null)
                    setRecipes(response);
            })
            .catch((error)=>
            {
                console.log(error);
                navigate('/error')
        })
        },[location.key]
    )
    const handleBlur = (value)=>{
        setBlur(value);
    }


    const handleFilter=(value)=>{
            setSearch("")
            if(value !== 1)
            {
                
                getRecipesByFilter(value,user.id,"")
                .then (
                    (response) => {
                        setRecipes(response);
                    }
                  )
                  .catch((error)=> {
                    console.log(error);
                    navigate('/error')
                  })
            }
            else {
              if(search === "")
                getAllRecipes()
                .then (
                  (response) => {
                      setRecipes(response)
                  }
                )
                .catch((error)=> {
                  console.log(error);
                  navigate(
                    '/error'
                  )
                })
              else
                getRecipesByName(search)
                .then (
                    (response) => {
                        setRecipes(response)
                    }
                  )
                  .catch((error)=> {
                    console.log(error);
                    navigate(
                      '/error'
                    )
                  })
                setAllFilter(true);
            }
            setAppliedFilter(value)
    }
    const handleGoToShoppingList = () => {
      const data= {option : 3};
                navigate("/userProfile", {state: data})
    }

    return(
        <div className="home">
            <div className={blur === true ? "blur" : ""}>
            <Header  className={blur === true ? "blur" : ""} handleChangeLikes={handleChangeLikes}></Header>
            </div>
            <div id="search-bar" className={blur === true ? "blur" : ""}>
            <input type="text" id="search" name="search" value={search} onChange={searchChangeHandler}  onKeyDown={handleKeyDown} placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop" />
             </div>
             <Filters blur={blur} handleFilter = {handleFilter} appliedFilter={appliedFilter} ></Filters>
             <hr></hr>
             <div className="recipes">
             { recipes.length !==0 && <RecipesView  recipes = {recipes} loggedUserId = {user.id} viewedUserId={user.id} handleBlur={handleBlur} handleChangeLikes={handleChangeLikes} handleGoToShoppingList={handleGoToShoppingList}></RecipesView>}
             </div>
        </div>
        
    )
}