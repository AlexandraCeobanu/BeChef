import axios from 'axios'
import { config, API_URL } from '../global'
export const getUserById = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/users/${id}`,config);
        if(response.status === 200)
        {
            const user = await response.data;
            return user;
        }
    }
    catch (error) {
        console.log(`Failed to get  the user.`,error);
        throw error.response.data;
    }
};