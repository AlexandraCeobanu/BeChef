import {useEffect, useState} from 'react';
import { getUserById } from '../services/user/getUserById';
import { useLocation } from 'react-router-dom';
import UserDescriptionView from './UserDescriptionView';
import UserRecipesView from './UserRecipesView';
import Header from './Header';
import {getProfileImage} from '../services/getProfileImage';

export default function UserProfileView()
{
    const [user, setUser] = useState(null);
    const [logged,setLogged] = useState(JSON.parse(localStorage.getItem('user')))
    const [changedNrLikes,setChangedNrLikes] = useState(false);
    const [profilePhoto,setProfilePhoto] = useState("");
    const [blur, setBlur] = useState(false);
    
    const defaultProfilePhoto = '/images/profile-no-photo.png';
    const location = useLocation();
    const  data  = location.state;
    useEffect(()=> {
        getUserById(data.userId)
        .then((response)=> {
                setUser(response)
                console.log(response);
        })
        .catch((error)=>{console.log(error)})
    },[])
    
    useEffect(()=>  {
        getProfileImage(data.userId)
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
    },[])
    
    useEffect(() => {
        getUserById(data.userId)
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
    const handleBlur = (value)=>{
        setBlur(value);
    }
   

    return(
        <div className="user-profile">
            <div className={blur === true ? "blur" : ""}>
            <Header ></Header>
            </div>
            {user && 
            <div className="user-info">
            <div className={blur === true ? "blur fixed-description" : "fixed-description"}>
            <UserDescriptionView  username={'@'+user.userUsername}  profilePhoto = {profilePhoto ? profilePhoto : defaultProfilePhoto} nrLikes ={user!==null ? user.nrLikes :0} nrRecipes = {user !== null ? user.nrRecipes : 0}></UserDescriptionView>
            </div>
            <UserRecipesView  loggedUserId = {logged.id}  viewedUserId={user.id} handleChangeLikes={handleChangeLikes}  handleBlur={handleBlur}></UserRecipesView>
            </div>
            }
        </div>
    )
}