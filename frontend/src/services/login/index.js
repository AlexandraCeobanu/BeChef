import axios from 'axios'
const API_URL = "http://localhost:8081";
const config = {
    headers: {
      'Authorization': 'Basic ZHZlZ2E6cGFzc3dvcmQ', 
    }
  };
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
        throw error;
    }
};