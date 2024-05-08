import axios from "axios";
import { config2,API_URL } from "./global";
export const getProfileImage = async(id)=>{

    // try {
    //     const response = await fetch(`${API_URL}/upload/profileImage?username=${username}`);
    //     const blob = await response.blob(); 
    //    return blob; 
    // } catch (error) {
    //     console.error('Eroare în obținerea imaginii:', error);
    // }
    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config2.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/upload/profileImage/${id}`,config2,{responseType: 'arraybuffer'});
        try{
        if (response.status === 200)
        {
            const imageData = new Uint8Array(response.data);
            if (imageData.length !== 0)
           { const blob = new Blob([imageData])  ;
            return blob;}
            else{
            return "";}
        }
    }
        catch(error){
            console.log(error)
        }
    }
    catch(error){
        throw error.response.data;
    }
}