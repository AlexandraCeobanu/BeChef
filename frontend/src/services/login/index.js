import axios from 'axios'
import { config, API_URL } from '../global'
export const loginUser = async (user) => {
    try{
        const response = await axios.post(`${API_URL}/login`,user,config);
        if(response.status === 200)
        {
            const token = await response.data;
            console.log(`User  successfully logged`);
            localStorage.setItem('token',JSON.stringify(token));
            localStorage.setItem('isAuthenticated',"true");
        }
    }
    catch (error) {
        console.log(`Failed to login in the user.`,error);
        throw error.response.data;
    }
};