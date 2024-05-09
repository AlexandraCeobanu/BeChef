import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
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
    const [appliedFilters,setAppliedFilters] = useState([])
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [blur, setBlur] = useState(false);
    const location = useLocation();
    const [allFilter,setAllFilter] = useState(true);
    const [changedNrLikes,setChangedNrLikes] = useState(false);
    const searchChangeHandler=(event) =>{
        setSearch(event.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          getRecipesByName(search)
          .then (
            (response) => {
                setRecipes(response.reverse())
            }
          )
          .catch((error)=> {
            console.log(error);
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


    const handleFilter=(value)=>{
            if(value !== 1)
            {
                getRecipesByFilter(value,user.id,search)
                .then (
                    (response) => {
                      let filter;
                      if(value === 2)
                      filter = "Breakfast";
                      if(value === 3)
                      filter = "Lunch";
                    if(value === 4) 
                      filter = "Dinner";
                    if(value === 5) 
                      filter = "Dessert";
                    if(value === 6)
                      filter = "01:00:00";
                    if(value === 7 )
                      filter = "02:00:00";
                    if(value === 8)
                      filter = "ingredients";
                        setAppliedFilters(prev => [...prev, filter])
                        setFilteredRecipes(prev => [...prev, ...response])  
                    }
                  )
                  .catch((error)=> {
                    console.log(error);
                  })
                setAllFilter(false);
            }
            else {
              if(search === "")
                getAllRecipes()
                .then (
                  (response) => {
                      setRecipes(response.reverse())
                  }
                )
                .catch((error)=> {
                  console.log(error);
                })
              else
                getRecipesByName(search)
                .then (
                    (response) => {
                        setRecipes(response.reverse())
                    }
                  )
                  .catch((error)=> {
                    console.log(error);
                  })
                setAllFilter(true);
            }
    }
    const handleRemoveFilter=(value)=> {
      let recipeType;
      let recipeTime;
        if(value === 2)
          recipeType = "Breakfast";
        if(value === 3)
          recipeType = "Lunch";
        if(value === 4) 
          recipeType = "Dinner";
        if(value === 5) 
          recipeType = "Dessert";
        if(value === 6)
          recipeTime = "01:00:00";
        if(value === 7 )
          recipeTime = "02:00:00";
        if(value === 2 || value === 3 || value === 4 || value === 5)
        {
          const newArray = appliedFilters.filter(item => item !== recipeType);
          setAppliedFilters(newArray);
          const newRecipes = recipes.filter(recipe => {
            if(appliedFilters.includes("01:00:00")){
            const recipeTime = dayjs(recipe.time, 'HH:mm:ss');
            return recipe.type !== recipeType ||  (recipe.type === recipeType && (recipeTime.isBefore(dayjs('01:00:00', 'HH:mm:ss')) || recipeTime.isSame(dayjs('01:00:00', 'HH:mm:ss'))));
            }
          else if(appliedFilters.includes("02:00:00")){
            const recipeTime = dayjs(recipe.time, 'HH:mm:ss');
            return recipe.type !== recipeType || (recipe.type === recipeType && (recipeTime.isBefore(dayjs('02:00:00', 'HH:mm:ss')) || recipeTime.isSame(dayjs('02:00:00', 'HH:mm:ss'))) );
          }
          else{
            return recipe.type !== recipeType;
          }
          });
        setRecipes(newRecipes);}

        if(value === 6 || value === 7 )
        {
          const newArray = appliedFilters.filter(item => item !== recipeTime);
          setAppliedFilters(newArray);
          const newRecipes = recipes.filter(recipe => {
            const recipeTime = dayjs(recipe.time, 'HH:mm:ss');
            let otherTime;
            if (value === 6) 
              otherTime = "02:00:00";
            else
            otherTime = "01:00:00";
            return (!recipeTime.isBefore(dayjs(recipeTime, 'HH:mm:ss')) && !recipeTime.isSame(dayjs(recipeTime, 'HH:mm:ss'))) || 
            (appliedFilters.includes(recipe.type)) || 
            ( appliedFilters.includes(otherTime) && 
            (recipeTime.isBefore(dayjs(otherTime, 'HH:mm:ss')) || recipeTime.isSame(dayjs(otherTime, 'HH:mm:ss')))) ;
          });
        setRecipes(newRecipes);
        }
        if(value === 8)
        {
          const newArray = appliedFilters.filter(item => item !== "ingredients");
          setAppliedFilters(newArray);
          const newRecipes = recipes.filter(recipe => {
            const recipeTime = dayjs(recipe.time, 'HH:mm:ss');
            return (appliedFilters.includes(recipe.type) || 
            (appliedFilters.includes("01:00:00") && (recipeTime.isBefore(dayjs('01:00:00', 'HH:mm:ss')) || recipeTime.isSame(dayjs('01:00:00', 'HH:mm:ss'))) ) || 
            (appliedFilters.includes("02:00:00") && (recipeTime.isBefore(dayjs('02:00:00', 'HH:mm:ss')) || recipeTime.isSame(dayjs('02:00:00', 'HH:mm:ss'))) ) 
           );
            
          });
        setRecipes(newRecipes);
        }
    }
    useEffect(()=> {
      const uniqueRecipes = filteredRecipes.filter((item, index, self) =>
                      index === self.findIndex((t) => (
                        t.id === item.id
                      ))
                    );
    
      setRecipes(uniqueRecipes);

    },[filteredRecipes])
    return(
        <div className="home">
            <div className={blur === true ? "blur" : ""}>
            <Header  className={blur === true ? "blur" : ""} handleChangeLikes={handleChangeLikes}></Header>
            </div>
            <div id="search-bar" className={blur === true ? "blur" : ""}>
            <input type="text" id="search" name="search" onChange={searchChangeHandler}  onKeyDown={handleKeyDown} placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop" />
             </div>
             <Filters blur={blur} handleFilter = {handleFilter} allFilter={allFilter} handleRemoveFilter={handleRemoveFilter}></Filters>
             <hr></hr>
             <div className="recipes">
             { recipes.length !==0 && <RecipesView  recipes = {recipes} loggedUserId = {user.id} viewedUserId={user.id} handleBlur={handleBlur} handleChangeLikes={handleChangeLikes}></RecipesView>}
             </div>

        </div>
    )
}