import axios from 'axios'
const API_URL = "http://localhost:8081/api/v1";
const config = {
    headers: {
      'Authorization': 'Basic ZHZlZ2E6cGFzc3dvcmQ', 
    }
  };
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
        console.log('Failed to register the user');
        throw error;
    }
};