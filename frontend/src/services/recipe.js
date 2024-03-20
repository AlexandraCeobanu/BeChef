import axios from "axios";
import { config, API_URL } from './global'
export const addRecipe = async(recipe) => {
    try{
        const response = await axios.post(`${API_URL}/recipes`,recipe,config);
        if (response.status === 201)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const addSteps = async(recipeId,steps) => {
    try{
        
        const response = await axios.post(`${API_URL}/recipes/${recipeId}/recipeSteps`,steps,config);
        if (response.status === 201)
        {
            const recipe = await response.data;
            return recipe;
        }
    }
    catch(error){
    throw error.response.data;
}
}