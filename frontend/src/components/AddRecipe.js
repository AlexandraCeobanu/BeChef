import Header from "./Header";
import AddRecipeLeft from "./AddRecipeLeft";
import AddRecipeRight from "./AddRecipeRight";
import "../styles/page.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe, addSteps,addIngredients } from "../services/recipe";
import { uploadRecipeImage } from "../services/uploadRecipeImage";
import { getRecipeImage } from "../services/getRecipeImage";
import { useEffect } from "react";
import { io } from "socket.io-client";
export default function AddRecipe()
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [recipePhoto,setRecipePhoto] = useState(null);
    let [ingredients,setIngredients] = useState([]);
    const [socket,setSocket] = useState(null);
    const [recipe,setRecipe] = useState({
        userId: user.id,
        name: '',
        description: '',
        type: ''
      });
    
    let [steps,setSteps] = useState([]);
      const navigate = useNavigate();
    const handleDescriptionChange = (description) => {
        setRecipe({...recipe,description})
      };
    
    const handleRecipeStepChange = (name, steps,ingredients,typeId) => {
        let  type ;
        if(typeId === 1)
            type= "Breakfast";
        if(typeId === 2) 
            type = "Lunch";
        if(typeId === 3) 
            type = "Dinner";
        if(typeId === 4)
            type = "Dessert";
        console.log(type)
       setRecipe({...recipe,name, type})
       setSteps(steps);
       setIngredients(ingredients);

      };

      const handleImageChange = (formData) => {
            setRecipePhoto(formData);
      }

      const handlePostRecipe = () => {
        addRecipe(recipe)
        .then((recipe) =>{
            // console.log("Reteta adaugata cu succes",JSON.stringify(recipe));
            addSteps(recipe.id,steps)
            .then(()=>{
                // console.log("Pasi adaugati cu succes");
            })
            .catch((error) => 
            {
                console.log(error);
            })
            addIngredients(recipe.id,ingredients)
            .then(()=> {

            })
            .catch((error)=> {
                console.log(error);
            })
            uploadRecipeImage(recipePhoto,recipe.id)
            .then(() => 
                {
                    // console.log("Imaginea cu reteta a fost incarcata");
                    getRecipeImage(recipe.id)
                    .then(
                        (response) => {
                            try{
                            if (response !== undefined){
                                const url = URL.createObjectURL(response)
                                setRecipePhoto(url);
                                navigate("/profile");
                            }
                        }
                            catch(error)
                            {
                                console.log("Eroare la convertirea imaginii", error);
                            }
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                    }
                    )
                })
            .catch((error) => {
                    console.log(error);
                })
            
        }
        )
        .catch((error) =>
        {
            console.log(error);
        })
      };

      useEffect(()=> {
        if(socket === null){
        const newSocket = io('http://localhost:8082'); 
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });
    }
    },[])
    useEffect(() => 
    {
        if(socket!==null)
        socket.emit('connection', user.id);
    },[socket,user.id])

    return(
        <div className="main-page">
            <Header socket={socket}></Header>
            <div className="without-header">
            <div className="fixed-side">
            <AddRecipeLeft onDescriptionChange={handleDescriptionChange} onPostRecipe={handlePostRecipe} onImageChange={handleImageChange} image={recipePhoto}></AddRecipeLeft>
            </div>
            <AddRecipeRight onRecipeStepChange={handleRecipeStepChange}></AddRecipeRight>
            </div>
        </div>
    )
}