package com.licenta.bechefbackend.socketIO;

import com.corundumstudio.socketio.SocketIOServer;
import com.licenta.bechefbackend.entities.OnlineUser;
import com.licenta.bechefbackend.repository.OnlineUserRepository;
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
    @Autowired
    private OnlineUserRepository onlineUserRepository;
    public void startServer()
    {

        socketIOServer.start();
        addEventListener();
        addConnection();
        removeConnection();
    }
    public void stopServer()
    {
        socketIOServer.stop();
    }
    private void addEventListener() {
        socketIOServer.addEventListener("message", String.class, (client, data, ackSender) -> {
            System.out.println("Received message from client: " + data);
            System.out.println(client.getSessionId());
            client.sendEvent("reply","Server received your message");
        });}

    private void addConnection() {
            socketIOServer.addEventListener("connection", String.class, (client, data, ackSender) -> {
                System.out.println("Received message from client: " + data);
                System.out.println(client.getSessionId());
                OnlineUser onlineUser = new OnlineUser(Long.valueOf(data),String.valueOf(client.getSessionId()));
                onlineUserRepository.save(onlineUser);
            });}
    private void removeConnection() {
            socketIOServer.addEventListener("remove-connection", String.class, (client, data, ackSender) -> {
                System.out.println("Received message from client: " + data);
                System.out.println(client.getSessionId());
                OnlineUser onlineUser = onlineUserRepository.findByUserId(Long.valueOf(data)).orElse(null);
                if(onlineUser != null)
                    onlineUserRepository.deleteById(onlineUser.getId());
            });
}
}
