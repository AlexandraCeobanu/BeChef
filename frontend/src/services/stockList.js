import axios from "axios";
import { config, API_URL } from './global'
export const getStockList = async(userId) => {
    try{
        const response = await axios.get(`${API_URL}/stockList?userId=${userId}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}
export const updateStockList = async(id,items) => {
    try{
        const response = await axios.put(`${API_URL}/stockList/${id}`,items,config);
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
        const response = await axios.delete(`${API_URL}/stockList/items/${id}`,config);
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
    throw error.response.data;
}
}

