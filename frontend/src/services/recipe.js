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
export const getRecipeById = async(id) => {
    try{
        const response = await axios.get(`${API_URL}/recipes/${id}`,config);
        if (response.status === 200)
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
        
        let response = await axios.post(`${API_URL}/recipes/${recipeId}/recipeSteps`,steps,config);
        if (response.status === 201)
        {
             response = await response.data;
            return response;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const addIngredients = async(recipeId,ingredients) => {
    try{
        
        let response = await axios.post(`${API_URL}/recipes/${recipeId}/ingredients`,ingredients,config);
        if (response.status === 201)
        {
            response = await response.data;
            return response;
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

export const getAllRecipes = async() => {
    try{
        
        const response = await axios.get(`${API_URL}/recipes/all`,config);
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

export const getRecipesByName = async(name) => {
    try{
        
        const response = await axios.get(`${API_URL}/recipes/byname?name=${name}`,config);
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
export const getRecipesByFilter = async(filter,userId,search) => {
    try{
        
        const response = await axios.get(`${API_URL}/recipes/filter/${filter}?userId=${userId}&recipeName=${search}`,config);
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
export const saveRecipe = async(userId,recipeId) => {
    try{
        
        const response = await axios.post(`${API_URL}/recipes/save/${recipeId}?userId=${userId}`,config);
        if (response.status === 201)
        {
            const res = await response.data;
            return res;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const removeSaveRecipe = async(userId,recipeId) => {
    try{
        
        const response = await axios.delete(`${API_URL}/recipes/save/${recipeId}?userId=${userId}`,config);
        if (response.status === 200)
        {
            const res = await response.data;
            return res;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const getUserSavedRecipes = async(userId) => {
    try{
        
        const response = await axios.get(`${API_URL}/recipes/save?userId=${userId}`,config);
        if (response.status === 200)
        {
            const res = await response.data;
            return res;
        }
    }
    catch(error){
    throw error.response.data;
}
}