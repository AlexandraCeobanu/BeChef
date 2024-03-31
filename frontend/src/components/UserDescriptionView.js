import React, { useEffect, useState } from 'react'
import '../styles/userDescription.scss'
export default function UserDescriptionView(props){

    const [nrLikes,setNrLikes] = useState(props.nrLikes)
    useEffect(() => {
        setNrLikes(props.nrLikes)
    },[props])
    return(
        <div className="userDescription">
            <div className="profile-picture">
            <img src = {props.profilePhoto} alt="Error"></img>
            </div>
            <h3>{props.username}</h3>
            <hr id="line"></hr>
            <div className="statistics">
                <div className="statistic">
                <h3>Recipes</h3>
                <h2>{props.nrRecipes}</h2>
                </div>
                <div className="statistic">
                <h3>Likes</h3>
                <h2>{nrLikes}</h2>
                </div>
            </div>
        </div>
    )
}