import axios from "axios";
import { config,config2, API_URL } from './global'
export const uploadProfileImage = async(image,username) => {
    try{
        const response = await axios.post(`${API_URL}/upload/profileImage?username=${username}`,image,config2);
        if (response.status === 200)
        {
            // console.log(JSON.stringify(response.data));
        }
    }
    catch(error){
    console.log(error);
    throw error.response.data;
}
}