import axios from 'axios'
import { config, API_URL } from '../global'
export const postThread = async (thread) => {
    try{
        const response = await axios.post(`${API_URL}/chat`,thread,config);
        if(response.status === 201)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to add thread.`,error);
        throw error.response.data;
    }
};