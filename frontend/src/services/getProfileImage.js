import axios from "axios";
import { config2,API_URL } from "./global";
export const getProfileImage = async(username)=>{

    // try {
    //     const response = await fetch(`${API_URL}/upload/profileImage?username=${username}`);
    //     const blob = await response.blob(); 
    //    return blob; 
    // } catch (error) {
    //     console.error('Eroare în obținerea imaginii:', error);
    // }
    try{
        const response = await axios.get(`${API_URL}/upload/profileImage?username=${username}`,{responseType: 'arraybuffer'},config2);
        try{
        if (response.status === 200)
        {
            const imageData = new Uint8Array(response.data);
            const blob = new Blob([imageData])  ;
            return blob;
        }}
        catch(error){
            console.log(error)
        }
    }
    catch(error){
        throw error.response.data;
    }
}