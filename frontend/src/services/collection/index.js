import axios from "axios";
import { config, API_URL } from '../global'
export const saveCollection = async(collection) => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.post(`${API_URL}/collections`,collection, config);
        if (response.status === 201)
        {
            const res = await response.data;
            return res;
        }
    }
    catch(error){
    throw error.response.data;
}
}