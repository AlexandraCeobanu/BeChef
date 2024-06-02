import axios from "axios";
import { config, API_URL } from '../global'
export const saveCollection = async(collection) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/collections`,collection, config);
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

export const getCollections = async(userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/collections?userId=${userId}`, config);
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

export const getRecipesByCollection = async(collectionId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/collections/${collectionId}/recipes`, config);
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

export const saveRecipeInCollection = async(collectionId, recipeId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/collections/${collectionId}/recipes?recipeId=${recipeId}`,null, config);
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

export const removeCollection = async(collectionId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.delete(`${API_URL}/collections/${collectionId}`, config);
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