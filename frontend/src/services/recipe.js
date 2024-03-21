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

export const getRecipesByUserId = async(id) => {
    try{
        
        const response = await axios.get(`${API_URL}/recipes?id=${id}`,config);
        if (response.status === 200)
        {
            const recipes = await response.data;
            return recipes;
        }
    }
    catch(error){
    throw error.response.data;
}
}