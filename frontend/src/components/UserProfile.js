import React from "react"
import { useState,useEffect } from "react"
import Header from "./Header"
import RecipesView from "./RecipesView"
import UserDescription from "./UserDescription"
import { getProfileImage } from "../services/getProfileImage"
import "../styles/userProfile.scss"
import { uploadProfileImage } from "../services/uploadProfileImage"
import { getUserById } from "../services/getUserById"
import UserRecipes from "./UserRecipes"
export default function UserProfile()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [changedNrLikes,setChangedNrLikes] = useState(false);
    const [uploadTrigger, setUploadTrigger] = useState(false);
    const [profilePhoto,setProfilePhoto] = useState("");
    const defaultProfilePhoto = '/images/profile-no-photo.png';
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
            setChangedNrLikes(false);
        }
        )
        .catch((error)=> {console.log(error)})
    },[changedNrLikes]);

    const handleChangeLikes = ()=>{
       setChangedNrLikes(true);
    }

    return(
        <div className="user-profile">
            <Header></Header>
            <div className="user-info">
            <div className="fixed-description">
            <UserDescription username={user.userUsername !==null ?'@'+user.userUsername : "anonim"}  profilePhoto = {profilePhoto ? profilePhoto : defaultProfilePhoto} nrLikes ={user!==null ? user.nrLikes :0} nrRecipes = {user !== null ? user.nrRecipes : 0} onImageChange={handleImageChange}></UserDescription>
            </div>
            <UserRecipes id={user.id} handleChangeLikes={handleChangeLikes}></UserRecipes>
            </div>
        </div>
    )
}