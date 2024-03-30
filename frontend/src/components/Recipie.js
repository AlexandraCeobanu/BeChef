import '../styles/recipie.scss'
import {faHeart,faComment} from '@fortawesome/free-regular-svg-icons';
import Feedback from './Feedback';
import { useState } from 'react';
import { giveLike } from '../services/like';
export default function Recipie(props)
{
    const handleClick=()=> {
        props.onClick();
    }
    const handleLike=()=> {
        console.log(props.recipe)
        let like = {
            likerId: props.userId,
            likedId: props.userId,
            recipeId: props.recipe.id
        }
        giveLike(like)
        .then((response)=> {
            console.log(response)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return(
        <div>
            <div className="recipie-photo" onClick={handleClick}>
                {/* <img src = {props.image} alt="Recipie"></img> */}
                <img src = "/images/recipie1.jpg"></img>
            </div>
            <div className="recipie-feedback">
            <Feedback text='Likes' icon={faHeart} onClick={handleLike}></Feedback>
            <Feedback text='Comments' icon={faComment}></Feedback>
            </div>
        </div>
    )
}