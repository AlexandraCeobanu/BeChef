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
export const addShoppingList = async(shoppingList) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/shoppingLists`,shoppingList,config);
        if (response.status === 201)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const getShoppingLists = async(userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/shoppingLists?userId=${userId}`,config);
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
        const response = await axios.put(`${API_URL}/shoppingLists/${id}`,items,config);
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
        const response = await axios.delete(`${API_URL}/shoppingLists/items/${id}`,config);
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
        const response = await axios.patch(`${API_URL}/shoppingLists/items/${id}`,value,config);
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
        const response = await axios.patch(`${API_URL}/shoppingLists/addIngredients?userId=${userId}`,ingredients,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const addCollaborator = async(id,userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/shoppingLists/${id}/collaborators`,userId,config);
        if (response.status === 201)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const deleteList = async(id) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.delete(`${API_URL}/shoppingLists/${id}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}