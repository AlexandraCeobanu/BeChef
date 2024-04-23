import { useEffect, useState } from "react"
import { getProfileImage } from "../services/getProfileImage";
import {getUserById} from "../services/user/getUserById";
import { useNavigate } from "react-router-dom";
export default function UserBadge(props)
{
    const defaultProfilePhoto = '/images/profile-no-photo.png';
    const [username,setUsername] = useState("");
    const [profileImage,setProfileImage] = useState(defaultProfilePhoto);
    const [loggedUser,setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();
    useEffect(()=> {
       
        getUserById(props.userId)
        .then((response)=> {
            setUsername(response.userUsername);
        })
        .catch((error)=> {console.log(error)})
    },[props.userId])

    useEffect(()=> {
       
        getProfileImage(props.userId)
        .then((response)=> {
            if (response !== undefined && response !==""){
                const url = URL.createObjectURL(response)
                setProfileImage(url);
            }
        })
        .catch((error)=> {console.log(error)})
    },[props.userId])
    const handleViewProfile=()=>{
        
        if(props.userId === loggedUser.id)
        {
            navigate("/profile");
        }
        else {
        const data= {userId : props.userId};
        navigate("/userProfileView",{state: data})
    }
    }
    return (
        <div className="comment" onClick={handleViewProfile}>
        <img src = {profileImage} className="mini-photo" alt="profile"></img>
        <h5>@{username}</h5>
        </div>
    )
}