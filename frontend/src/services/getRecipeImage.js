import axios from "axios";
import { config2,API_URL } from "./global";
export const getRecipeImage = async(recipeId)=>{

    try{
        const token = localStorage.getItem('token').replace(/^"(.*)"$/, '$1');
        config2.headers.Authorization = `Bearer ${token}`;
        const response = await axios.get(`${API_URL}/upload/recipeImage/${recipeId}`,{responseType: 'arraybuffer'},config2);
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