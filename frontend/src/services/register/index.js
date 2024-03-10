import axios from 'axios'
import { config, API_URL } from '../global'
export const registerUser = async (newUser) => {
    try{
        const response = await axios.post(`${API_URL}/register`,newUser,config);
        const token = response.data;
        if(token)
        {
            console.log(`Token ${JSON.stringify(token)}`);
        }
    }
    catch(error)
    {
        
        console.log('Failed to register the user',error);
        throw error.response.data;
    }
};