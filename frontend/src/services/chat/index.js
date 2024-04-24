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
export const getAllThreads = async () => {
    try{
        const response = await axios.get(`${API_URL}/chat`,config);
        if(response.status === 200)
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
export const postMessage = async (threadId,message) => {
    try{
        const response = await axios.post(`${API_URL}/chat/${threadId}/messages`,message,config);
        if(response.status === 201)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to add message.`,error);
        throw error.response.data;
    }
};

export const getThreadMessages = async (threadId) => {
    try{
        const response = await axios.get(`${API_URL}/chat/${threadId}/messages`,config);
        if(response.status === 200)
        {
            const res  = await response.data;
            return res;
        }
    }
    catch (error) {
        console.log(`Failed to get messages.`,error);
        throw error.response.data;
    }
};