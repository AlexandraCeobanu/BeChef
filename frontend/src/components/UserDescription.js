import React from 'react'
import { useState } from 'react'
import '../styles/userDescription.scss'
export default function UserDescription(props){

   const handleImageUpload = (event) => {
    const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file',file);
            props.onImageChange(formData);
            // const reader = new FileReader();

            // reader.onload = function(e) {
            //     const newImage = e.target.result;
            //     props.onImageChange(newImage);
            // };

            // reader.readAsDataURL(file);
        }
   };
   const handleDefaultImageClick = () => {
    document.getElementById('file-input').click();
};

    return(
        <div className="userDescription">
            <div className="profile-picture">
            <input type="file" id="file-input" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }}></input>
            <img src = {props.profilePhoto} alt="Default-photo"  onClick={handleDefaultImageClick} ></img>
            </div>
            <h3>{props.username}</h3>
            <div className="description">
                {/* <p>Iasi, Romania</p>
                <p>Student passionate about food</p> */}
            </div>
            <hr id="line"></hr>
            <div className="statistics">
                <div className="statistic">
                <h3>Recipes</h3>
                <h2>{props.nrRecipes}</h2>
                </div>
                <div className="statistic">
                <h3>Likes</h3>
                <h2>{props.nrLikes}</h2>
                </div>
            </div>
        </div>
    )
}