import axios from 'axios'
import { config, API_URL } from '../global'
export const giveLike = async (like) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
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
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
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
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
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

export const removeLike = async (userId,recipeId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.delete(`${API_URL}/likes?userId=${userId}&recipeId=${recipeId}`,config);
        if(response.status === 204)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to remove like.`,error);
        throw error.response.data;
    }
};