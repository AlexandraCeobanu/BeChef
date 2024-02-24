import axios from 'axios'
import { config, API_URL } from '../global'
export const registerUser = async (newUser) => {
    try{
        const response = await axios.post(`${API_URL}/register`,newUser,config);
        const user = response.data;
        if(user)
        {
            console.log(`User ${JSON.stringify(user.username)} succesfully registered`);
        }
    }
    catch(error)
    {
        
        console.log('Failed to register the user',error);
        throw error.response.data;
    }
};