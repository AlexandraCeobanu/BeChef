package com.licenta.bechefbackend.socketIO;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.entities.OnlineUser;
import com.licenta.bechefbackend.repository.OnlineUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.UUID;

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
        notifyLike();
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

                OnlineUser onlineUser = onlineUserRepository.findByUserId(Long.valueOf(data)).orElse(null);
                if(onlineUser == null){
                OnlineUser newOnlineUser = new OnlineUser(Long.valueOf(data),String.valueOf(client.getSessionId()));
                onlineUserRepository.save(newOnlineUser);
                }
                else
                {

                    onlineUserRepository.updateSessionId(String.valueOf(client.getSessionId()), onlineUser.getId());
                }
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
    private void notifyLike() {
        socketIOServer.addEventListener("notify", LikeDTO.class, (client, data, ackSender) -> {

            System.out.println(client.getSessionId());

           OnlineUser onlineUser = onlineUserRepository.findByUserId(data.getLikedId()).orElse(null);
            System.out.println(onlineUser.getSessionId());
           if(onlineUser != null)
           {
               SocketIOClient receiverClient = socketIOServer.getClient(UUID.fromString(onlineUser.getSessionId()));
              receiverClient.sendEvent("new-notification" , data.getLikerId() + " ti a dat like ");
           }
        });
    }
}
