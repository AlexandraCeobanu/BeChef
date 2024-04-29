import React, { createContext, useContext, useState, useEffect } from 'react';
import {over} from 'stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [webSocket, setWebSocket] = useState(null);
  const [client, setClient] = useState(null);
let stompClient;
  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws');
        if(socket!==null){
        setWebSocket(socket);
        stompClient = over(socket);
        stompClient.connect({}, function(frame) {
            console.log('Conectat la server WebSocket');
            setClient(stompClient);
        }) 
        return () => {
            if (stompClient !== null && stompClient.connected) {
                stompClient.disconnect();
                console.log('Deconectat de la server WebSocket');
            }
        };
    }
  }, []);

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useStompClient = () => {
  return useContext(WebSocketContext);
};
