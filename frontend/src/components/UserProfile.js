import React from "react"
import { useState,useEffect } from "react"
import Header from "./Header"
import RecipesView from "./RecipesView"
import UserDescription from "./UserDescription"
import { getProfileImage } from "../services/getProfileImage"
import "../styles/userProfile.scss"
import { uploadProfileImage } from "../services/uploadProfileImage"
import { getRecipesByUserId } from "../services/recipe"
import { getUserById } from "../services/getUserById"
export default function UserProfile()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [uploadTrigger, setUploadTrigger] = useState(false);
    const [profilePhoto,setProfilePhoto] = useState("");
    const [recipes,setRecipes] = useState([]);
    const defaultProfilePhoto = '/images/profile-no-photo.png'
    const handleImageChange = (formData) => {
        uploadProfileImage(formData,user.userUsername)
        .then(()=>{
            setUploadTrigger(prevState => !prevState)}
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
    };

    useEffect(()=>  {
        getProfileImage(user.userUsername)
        .then(
            (response) => {
                try{
                if (response !== undefined && response !==""){
                    const url = URL.createObjectURL(response)
                    setProfilePhoto(url);
                }
            }
                catch(error)
                {
                    console.log("Eroare la convertirea imaginii", error);
                }
            }
        )
    },[uploadTrigger])
    

    useEffect(() => {

        getUserById(user.id)
        .then((user)=>{
            setUser(user);
        }
        )
        .catch((error)=> {console.log(error)})
        getRecipesByUserId(user.id)
        .then(
            (recipes) => {
                    setRecipes(recipes);
            }
        )
        .catch((error) =>
        {
            console.log(error);
        })
    },[]);

    return(
        <div className="user-profile">
            <Header></Header>
            <div className="user-info">
            <div className="fixed-description">
            <UserDescription username={'@'+user.userUsername}  profilePhoto = {profilePhoto ? profilePhoto : defaultProfilePhoto} nrLikes ={user.nrLikes} nrRecipes = {user.nrRecipes} onImageChange={handleImageChange}></UserDescription>
            </div>
            <RecipesView recipes={recipes}></RecipesView>
            </div>
        </div>
    )
}