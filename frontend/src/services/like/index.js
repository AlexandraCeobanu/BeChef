import axios from 'axios'
import { config, API_URL } from '../global'
export const giveLike = async (like) => {
    try{
        const response = await axios.post(`${API_URL}/likes`,like,config);
        if(response.status === 201)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to like the recipe.`,error);
        throw error.response.data;
    }
};

export const getRecipeLikes = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/likes?recipeId=${id}`,config);
        if(response.status === 200)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to get recipe likes.`,error);
        throw error.response.data;
    }
};

export const getUserLikedRecipes = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/likes/likerUser/${id}`,config);
        if(response.status === 200)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to get recipe likes by user.`,error);
        throw error.response.data;
    }
};