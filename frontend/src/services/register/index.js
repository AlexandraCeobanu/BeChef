import axios from 'axios'
import { config, API_URL } from '../global'
export const registerUser = async (newUser) => {
    try{
        const response = await axios.post(`${API_URL}/register`,newUser,config);
        if(response.status === 201)
        {
            return response.data;
        }
    }
    catch(error)
    {
        
        console.log('Failed to register the user',error);
        throw error.response.data;
    }
};
export const sendConfirmationToken = async (token) => {
    try{
        const response = await axios.get(`${API_URL}/register/confirm?token=${token}`);
        if (response.status === 200)
        {
            const message = await response.data;
            return message;
        }
    }
    catch(error) {
        console.log(`Failed to send token.`, error);
        throw error.response.data;
    }
};
export const resendLink = async (email) => {
    try{

        const response = await axios.get(`${API_URL}/register/resendLink?email=${email}`);
        if (response.status === 200)
        {
            const message = await response.data;
            return message;
        }
    }
    catch(error) {
        console.log(`Failed to resend token.`, error);
        throw error.response.data;
    }
};

