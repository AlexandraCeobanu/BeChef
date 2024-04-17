package com.licenta.bechefbackend.socketIO;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.bechefbackend.DTO.CommentDTO;
import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.OnlineUser;
import com.licenta.bechefbackend.repository.OnlineUserRepository;
import com.licenta.bechefbackend.services.NotificationService;
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
    @Autowired
    private NotificationService notificationService;
    public void startServer()
    {

        socketIOServer.start();
        addEventListener();
        addConnection();
        removeConnection();
        notifyLike();
        notifyComm();
        removeLike();
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
            OnlineUser onlineUser = onlineUserRepository.findByUserId(data.getLikedId()).orElse(null);
            NotificationDTO notificationDTO = new NotificationDTO(data.getLikerId(), data.getLikedId(),
                    data.getRecipeId(), "liked your recipe" ,false);
            notificationService.createNotification(notificationDTO);
           if(onlineUser != null)
           {
               SocketIOClient receiverClient = socketIOServer.getClient(UUID.fromString(onlineUser.getSessionId()));
              receiverClient.sendEvent("new-notification" , notificationDTO);
           }
        });
    }


    private void notifyComm() {
        socketIOServer.addEventListener("notifyComm", CommentDTO.class, (client, data, ackSender) -> {

            OnlineUser onlineUser = onlineUserRepository.findByUserId(data.getReceiverId()).orElse(null);


            NotificationDTO notificationDTO = new NotificationDTO(data.getSenderId(), onlineUser.getUserId(),
                    data.getRecipeId(), "added a comment: " + data.getComm() ,false);
            notificationService.createNotification(notificationDTO);

            if(onlineUser != null)
            {
                SocketIOClient receiverClient = socketIOServer.getClient(UUID.fromString(onlineUser.getSessionId()));
                receiverClient.sendEvent("new-notification" , notificationDTO);
            }
        });
    }
    private void removeLike() {
        socketIOServer.addEventListener("removed", LikeDTO.class, (client, data, ackSender) -> {
            OnlineUser onlineUser = onlineUserRepository.findByUserId(data.getLikedId()).orElse(null);

            if(onlineUser != null)
            {
                SocketIOClient receiverClient = socketIOServer.getClient(UUID.fromString(onlineUser.getSessionId()));
                receiverClient.sendEvent("remove-like" , "removed-like" );
            }
        });
    }
}
