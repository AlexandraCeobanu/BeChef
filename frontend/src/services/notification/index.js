import axios from "axios";
import { config, API_URL } from '../global'
export const getAllNotifications = async(userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
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
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
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

export const getNumberOfUnreadNotifications = async(userId) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/notifications/unread?userId=${userId}`,config);
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