import React from "react"
import { useState,useEffect } from "react"
import Header from "./Header"
import RecipesView from "./RecipesView"
import UserDescription from "./UserDescription"
import { getProfileImage } from "../services/getProfileImage"
import "../styles/userProfile.scss"
import { uploadProfileImage } from "../services/uploadProfileImage"
export default function UserProfile()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [profilePhoto,setProfilePhoto] = useState("");
    const [recipes,setRecipes] = useState(null);
    const defaultProfilePhoto = '/images/profile-no-photo.png'
    const handleImageChange = (formData) => {
        // setProfilePhoto(formData.get('file').name);
        uploadProfileImage(formData,user.username)
        .then(
            () => {

                getProfileImage(user.username)
                .then(
                    (response) => {
                        if (response !== undefined){
                        const blob = new Blob([response], { type: 'image/jpeg' }); 
                        const imageUrl = URL.createObjectURL(blob);
                        console.log(imageUrl);
                        setProfilePhoto(imageUrl);}
                    }
                )
                .catch((error) => {
                    console.log(error);
                }
                )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    };

    const handleAddImage = (formData) => {
        addRecipe(formData,user.username)
        .then(
            () => {
                getRecipe(user.username)
                .then(
                    (response) => {
                        if (response !== undefined){
                        const blob = new Blob([response], { type: 'image/jpeg' }); 
                        const imageUrl = URL.createObjectURL(blob);
                        console.log(imageUrl);
                        setRecipes(imageUrl);}
                    }
                )
                .catch((error) => {
                    console.log(error);
                }
                )
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    };

    return(
        <div className="user-profile">
            <Header></Header>
            <div className="user-info">
            <div className="fixed-description">
            <UserDescription username={'@'+user.username} profilePhoto = {profilePhoto ? profilePhoto : defaultProfilePhoto} nrLikes ={user.nrLikes} nrRecipes = {user.nrRecipes} onImageChange={handleImageChange}></UserDescription>
            </div>
            <RecipesView onImageChange = {handleAddImage}></RecipesView>
            </div>
        </div>
    )
}