import io from 'socket.io-client';
export const config = {
    headers: {
      'Content-Type': 'application/json', 
    }
  };
  export const config2 = {
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  }
export const API_URL = "http://localhost:8081/api/v1";

const socket = io('http://localhost:8082'); 

export default socket;