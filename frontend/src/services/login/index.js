import axios from 'axios'
import { config,config2, API_URL } from '../global'
export const loginUser = async (user) => {
    try{
        const response = await axios.post(`${API_URL}/login`,user,config);
        if(response.status === 200)
        {
            const user = await response.data;
            const token = user.token;
            console.log(`User  successfully logged`);
            localStorage.setItem('token',JSON.stringify(token));
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('isAuthenticated',"true");
            return user;
        }
    }
    catch (error) {
        console.log(`Failed to login in the user.`,error);
        throw error.response.data;
    }
};