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
import { io } from "socket.io-client";
import Filters from "./Filters";
export default function Home()
{
    const [search,setSearch] = useState(null);
    const [recipes,setRecipes] = useState([]);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [blur, setBlur] = useState(false);
    const location = useLocation();
    const [socket, setSocket]  = useState(null);
    const [allFilter,setAllFilter] = useState(true);
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
        },[location.key,allFilter]
    )
    const handleBlur = (value)=>{
        setBlur(value);
    }

    useEffect(()=> {
        if(socket === null){
        const newSocket = io('http://localhost:8082'); 
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
    }
    },[])
    useEffect(() => 
    {
        if(socket!==null)
        socket.emit('connection', user.id);
    },[socket,user.id])

    const handleFilter=(value)=>{
            if(value !== 1)
            {
                getRecipesByFilter(value);
                setAllFilter(false);
            }
            else {
                setAllFilter(true);
            }
    }
    return(
        <div className="home">
            <div className={blur === true ? "blur" : ""}>
            <Header socket ={socket} className={blur === true ? "blur" : ""}></Header>
            </div>
            <div id="search-bar" className={blur === true ? "blur" : ""}>
            <input type="text" id="search" name="search" onChange={searchChangeHandler}  onKeyDown={handleKeyDown} placeholder="Search by recipe name" ></input>
             <FontAwesomeIcon icon={faMagnifyingGlass} id="loop" />
             </div>
             <Filters blur={blur} handleFilter = {handleFilter} allFilter={allFilter}></Filters>
             <hr></hr>
             <div className="recipes">
             {recipes.length !==0 && <RecipesView socket={socket} recipes = {recipes} loggedUserId = {user.id} viewedUserId={user.id} handleBlur={handleBlur}></RecipesView>}
             </div>

        </div>
    )
}