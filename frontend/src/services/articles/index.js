import axios from 'axios'
import { config, API_URL } from '../global'
export const getArticles = async () => {
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
         config.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/articles`,config);
        if(response.status === 200)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(error)
        console.log(`Failed to get articles.`,error);
        throw error.response.data;
    }
};