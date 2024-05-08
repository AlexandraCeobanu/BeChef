import axios from 'axios'
import { config, API_URL } from '../global'
export const changePassword = async (user) => {
    try{
        
        const response = await axios.post(`${API_URL}/changePassword`,user,config);
        if(response.status === 200)
        {
            const message = await response.data;
            console.log(`${JSON.stringify(message)}`);
            // localStorage.setItem('token',JSON.stringify(token));
            // localStorage.setItem('isAuthenticated',"true");
        }
    }
    catch (error) {
        console.log(`Failed to change the password.`,error);
        throw error.response.data;
    }
};

export const sendCode = async (code) => {
    try{
        const token = localStorage.getItem('token');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/confirmChangedPassword?token=${code}`);
        if (response.status === 200)
        {
            const message = await response.data;
            return message;
        }
    }
    catch(error) {
        console.log(`Failed to send code.`, error);
        throw error.response.data;
    }
};