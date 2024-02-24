import axios from 'axios'
import { config, API_URL } from '../global'
export const loginUser = async (user) => {
    try{
        const response = await axios.post(`${API_URL}/login`,user,config);
        const loggedUser = response.data;
        if(loggedUser)
        {
            console.log(`User  succesfully logged`);
        }
    }
    catch (error) {
        console.log(`Failed to login in the user.`,error);
        throw error.response.data;
    }
};