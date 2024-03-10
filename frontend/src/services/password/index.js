import axios from 'axios'
import { config, API_URL } from '../global'
export const changePassword = async (user) => {
    try{
        const response = await axios.post(`${API_URL}/changePassword`,user,config);
        if(response.status === 200)
        {
            const token = await response.data;
            console.log(`Password  successfully changed`);
            // localStorage.setItem('token',JSON.stringify(token));
            // localStorage.setItem('isAuthenticated',"true");
        }
    }
    catch (error) {
        console.log(`Failed to change the password.`,error);
        throw error.response.data;
    }
};