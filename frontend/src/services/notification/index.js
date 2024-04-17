import axios from "axios";
import { config, API_URL } from '../global'
export const getAllNotifications = async(userId) => {
    try{
        
        const response = await axios.get(`${API_URL}/notifications?userId=${userId}`,config);
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

export const readAllNotifications = async(userId) => {
    try{
        
        const response = await axios.patch(`${API_URL}/notifications?userId=${userId}`,config);
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