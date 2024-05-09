import axios from "axios";
import { config, API_URL } from './global'
export const getShoppingList = async(userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/shoppingList?userId=${userId}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const updateShoppingList = async(id,items) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.put(`${API_URL}/shoppingList/${id}`,items,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const deleteItem = async(id) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.delete(`${API_URL}/shoppingList/items/${id}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const checkItem = async(id,value) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.patch(`${API_URL}/shoppingList/items/${id}`,value,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const addIngredientsToShoppingList = async(userId,ingredients) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.patch(`${API_URL}/shoppingList/addIngredients?userId=${userId}`,ingredients,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}