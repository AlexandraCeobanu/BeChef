import axios from 'axios'
import { config, API_URL } from '../global'
export const registerUser = async (newUser) => {
    try{
        const response = await axios.post(`${API_URL}/register`,newUser,config);
        if(response.status === 201)
        {
            const token = await response.data;
            console.log(`User  successfully registered`);
            localStorage.setItem('token',JSON.stringify(token));
            localStorage.setItem('isAuthenticated',"true");
        }
    }
    catch(error)
    {
        
        console.log('Failed to register the user',error);
        throw error.response.data;
    }
};