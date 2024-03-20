import axios from "axios";
import { config,config2, API_URL } from './global'
export const uploadRecipeImage = async(image,recipeId) => {
    try{
        const response = await axios.post(`${API_URL}/upload/recipeImage?recipeId=${recipeId}`,image,config2);
        if (response.status === 200)
        {
            console.log(JSON.stringify(response.data));
        }
    }
    catch(error){
    console.log(error);
    throw error.response.data;
}
}