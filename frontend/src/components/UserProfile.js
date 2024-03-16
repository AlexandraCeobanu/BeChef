import React from "react"
import { useState } from "react"
import Header from "./Header"
import RecipesView from "./RecipesView"
import UserDescription from "./UserDescription"
import "../styles/userProfile.scss"
export default function UserProfile()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const defaultProfilePhoto = '/images/profile-no-photo.png'
    const handleImageChange = (newImage) => {
        const updatedUser = {
            ...user,
            profilePhoto: newImage
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); 
    };
    return(
        <div className="user-profile">
            <Header></Header>
            <div className="user-info">
            <div className="fixed-description">
            <UserDescription username={'@'+user.username} profilePhoto = {user.profilePhoto ? user.profilePhoto : defaultProfilePhoto} onImageChange={handleImageChange}></UserDescription>
            </div>
            <RecipesView></RecipesView>
            </div>
        </div>
    )
}