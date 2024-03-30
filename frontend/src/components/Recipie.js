import '../styles/recipie.scss'
import {faHeart,faComment} from '@fortawesome/free-regular-svg-icons';
import Feedback from './Feedback';
import { useEffect, useState } from 'react';
import { giveLike } from '../services/like';
import { getRecipeLikes } from '../services/like';
import { useLocation } from 'react-router-dom';
import { getUserLikedRecipes,removeLike } from '../services/like';

export default function Recipie(props)
{
    const [liked,setLiked] = useState(false);
    const [nrLikes,setNrLikes] = useState(0);
    const location = useLocation();
    const handleClick=()=> {
        props.onClick();
    }
    const handleLike=(value)=> {
        if (value === true){
            let like = {
            likerId: props.userId,
            likedId: props.recipe.userId,
            recipeId: props.recipe.id
            }
            giveLike(like)
            .then(()=> {
            setLiked(!liked);
            })
            .catch((error)=>{
                console.log(error);
            })}
        if (value === false)
        {
            removeLike(props.userId,props.recipe.id)
            .then(()=> {
            setLiked(false);
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        }
    useEffect(
        ()=> {
            getRecipeLikes(props.recipe.id)
            .then ((response)=> {
                setNrLikes(response.length)
                props.handleChangeLikes();
            })
            .catch((error)=>{console.log(error)})
        },[liked]
    )

    useEffect(
        ()=> {
            getUserLikedRecipes(props.userId)
            .then ((response)=> {
                if (response.some(like => like.recipeId === props.recipe.id) === true)
                    setLiked(true)})
            .catch((error)=>{console.log(error)})
        },[]
    )
    return(
        <div>
            <div className="recipie-photo" onClick={handleClick}>
                {/* <img src = {props.image} alt="Recipie"></img> */}
                <img src = "/images/recipie1.jpg"></img>
            </div>
            <div className="recipie-feedback">
            <Feedback text='Likes' icon={faHeart} onClick={handleLike} nr = {nrLikes} liked={liked} ></Feedback>
            <Feedback text='Comments' icon={faComment} nr ={0}></Feedback>
            </div>
        </div>
    )
}