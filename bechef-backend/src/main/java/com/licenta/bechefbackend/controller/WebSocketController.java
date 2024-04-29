package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.DTO.MessageDTO;
import com.licenta.bechefbackend.DTO.MessageResponse;
import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.OnlineUser;
import com.licenta.bechefbackend.repository.OnlineUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    OnlineUserRepository onlineUserRepository;
    @MessageMapping("/messages")
    @SendTo("/newMessage")
    public MessageResponse sendMessage(@Payload MessageDTO messageDTO)
    {
        MessageResponse msResponse = new MessageResponse(messageDTO.getMessage(), messageDTO.getSenderId(),
                messageDTO.getThreadId());
    return msResponse;
    }

    @MessageMapping("/{userId}/like")
    @SendTo("/newNotification/{userId}")
    public NotificationDTO addLike(@DestinationVariable String userId, @Payload LikeDTO likeDTO)
    {

        NotificationDTO notificationDTO = new NotificationDTO(likeDTO.getLikerId(), likeDTO.getLikedId(),
                likeDTO.getRecipeId(), "liked your recipe" ,false);
        return notificationDTO;
    }

    @MessageMapping("/connect")
    public void connectUser(@Payload String userId)
    {
        OnlineUser onlineUser = onlineUserRepository.findByUserId(Long.valueOf(userId)).orElse(null);
        if(onlineUser == null){
            OnlineUser newOnlineUser = new OnlineUser(Long.valueOf(userId),"abc");
            onlineUserRepository.save(newOnlineUser);
        }
    }

    @MessageMapping("/disconnect")
    public void disconnectUser(@Payload String userId)
    {
        OnlineUser onlineUser = onlineUserRepository.findByUserId(Long.valueOf(userId)).orElse(null);
        if(onlineUser == null){
            onlineUserRepository.deleteById(onlineUser.getUserId());
        }
    }

}
