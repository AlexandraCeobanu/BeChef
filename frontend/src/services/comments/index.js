import axios from 'axios'
import { config, API_URL } from '../global'
export const postComment = async (comm) => {
    try{
        const response = await axios.post(`${API_URL}/comments`,comm,config);
        if(response.status === 201)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to add comment.`,error);
        throw error.response.data;
    }
};
export const getRecipeComments = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/comments?recipeId=${id}`,config);
        if(response.status === 200)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to get comments.`,error);
        throw error.response.data;
    }
};