import '../styles/recipe.scss'
import {faHeart,faComment,faClock} from '@fortawesome/free-regular-svg-icons';
import Feedback from './Feedback';
import { useEffect, useState } from 'react';
import { giveLike } from '../services/like';
import { getRecipeLikes } from '../services/like';
import { getUserLikedRecipes,removeLike } from '../services/like';
import { getRecipeComments } from '../services/comments';
import { useStompClient } from "./WebSocketProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Recipe(props)
{
    const [liked,setLiked] = useState(false);
    const [recipe,setRecipe] = useState(props.recipe);
    const [nrLikes,setNrLikes] = useState(0);
    const [nrComments,setNrComments] = useState(0);
    const client = useStompClient();
    const handleClick=()=> {
        props.onClick(props.index);
    }
    const handleLike=(value)=> {
        let like = {
            likerId: props.loggedUserId,
            likedId: recipe.userId,
            recipeId: recipe.id
            }
        if (value === true){
            giveLike(like)
            .then(()=> {
            setLiked(!liked);
            if(client!==null && client !==undefined){
            client.send(`/user/${like.likedId}/like`,[],JSON.stringify(like));}
            
            })
            .catch((error)=>{
                console.log(error);
            })}
        if (value === false)
        {
            removeLike(props.loggedUserId,recipe.id)
            .then(()=> {
            setLiked(false);
            if(client!==null && client !==undefined){
            client.send(`/user/${like.likedId}/removeLike`,[],JSON.stringify(like));}
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        }
    useEffect(
        ()=> {
            getRecipeLikes(recipe.id)
            .then ((response)=> {
                setNrLikes(response.length);
                if (props.handleChangeLikes != undefined)
                props.handleChangeLikes();
            })
            .catch((error)=>{console.log(error)})
        },[liked]
    )

    useEffect(
        ()=> {
            getRecipeLikes(recipe.id)
            .then ((response)=> {
                setNrLikes(response.length);
            })
            .catch((error)=>{console.log(error)})
        },[props]
    )

    useEffect(
        ()=> {
            getUserLikedRecipes(props.loggedUserId)
            .then ((response)=> {
                if (response.some(like => like.recipeId === props.recipe.id) === true)
                    setLiked(true)})
            .catch((error)=>{console.log(error)})
        },[]
    )

    useEffect(
        ()=> {
            getRecipeComments(recipe.id)
            .then ((response)=> {
                setNrComments(response.length);
            })
            .catch((error)=>{console.log(error)})
        },[props]
    )
    
    return(
        <div>
            <div className='time'>
                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                <h5>{recipe.time}</h5>
            </div>
            <div className="recipie-photo" onClick={handleClick}>
                <img src = {props.image} alt="Recipie"></img>
            </div>
            <div className="recipie-feedback">
            <Feedback text='Likes' icon={faHeart} onClick={handleLike} nr = {nrLikes} liked={liked} ></Feedback>
            <Feedback text='Comments' icon={faComment} nr ={nrComments} ></Feedback>
            </div>
        </div>
    )
}