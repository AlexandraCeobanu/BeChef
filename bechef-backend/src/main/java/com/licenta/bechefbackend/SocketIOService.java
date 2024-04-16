package com.licenta.bechefbackend;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class SocketIOService {
    private final SocketIOServer socketIOServer;
    @Autowired
    public SocketIOService(SocketIOServer socketIOServer){
        this.socketIOServer = socketIOServer;
    }
    public void startServer()
    {
        System.out.println("S-a pornit socketul ");
        socketIOServer.start();
        addEventListener();
    }
    public void stopServer()
    {
        socketIOServer.stop();
    }
    private void addEventListener() {
        socketIOServer.addEventListener("message", String.class, (client, data, ackSender) -> {
            System.out.println("Received message from client: " + data);
            ackSender.sendAckData("Message received successfully: " + data);
        });
}
}
