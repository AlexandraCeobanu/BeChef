import axios from "axios";
import { config2,API_URL } from "./global";
export const getProfileImage = async(username)=>{
    try{
        const response = await axios.get(`${API_URL}/upload/profileImage?username=${username}`,config2)
        if (response.status === 200)
        {
            return response.data;
        }
    }
    catch(error){
        throw error.response.data;
    }
}