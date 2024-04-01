import axios from "axios";
import { config, API_URL } from './global'
export const getShoppingList = async(userId) => {
    try{
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