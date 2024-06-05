import axios from "axios";
import { config, API_URL } from './global'
export const getShoppingListById = async(id) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/shoppingLists/${id}`,config);
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

export const addIngredientsToShoppingList = async(userId,recipeId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.patch(`${API_URL}/shoppingLists/addIngredients?userId=${userId}`,recipeId,config);
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
export const getCollaborators = async(id) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/shoppingLists/${id}/collaborators`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const deleteCollaborator= async(colId,listId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.delete(`${API_URL}/shoppingLists/${listId}/collaborators?colId=${colId}`,config);
        if (response.status === 200)
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

export const getInvitation = async(id,senderId,receiverId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/shoppingLists/${id}/invitations?senderid=${senderId}&receiverId=${receiverId}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const getInvitations = async(id) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/shoppingLists/${id}/invitations`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const declineCollaboration = async(id,userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.patch(`${API_URL}/shoppingLists/${id}/invitations?receiverId=${userId}`,userId,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const createInvitation = async(id,collaboratorEmail) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/shoppingLists/${id}/invitations?email=${collaboratorEmail}`,null,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

export const deleteInvitation = async(listId,id) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.delete(`${API_URL}/shoppingLists/${listId}/invitations/${id}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}