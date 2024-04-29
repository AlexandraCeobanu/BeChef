package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.*;
import com.licenta.bechefbackend.entities.OnlineUser;
import com.licenta.bechefbackend.repository.OnlineUserRepository;
import com.licenta.bechefbackend.services.NotificationService;
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
    @Autowired
    NotificationService notificationService;
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
        notificationService.createNotification(notificationDTO);
        return notificationDTO;
    }

    @MessageMapping("/{userId}/removeLike")
    @SendTo("/newNotification/removeLike/{userId}")
    public String removeLike(@DestinationVariable String userId, @Payload LikeDTO likeDTO)
    {

        return "Like removed";
    }

    @MessageMapping("/{userId}/comment")
    @SendTo("/newNotification/{userId}")
    public NotificationDTO addComm(@DestinationVariable String userId, @Payload CommentDTO commentDTO)
    {

        NotificationDTO notificationDTO = new NotificationDTO(commentDTO.getSenderId(), commentDTO.getReceiverId(),
                commentDTO.getRecipeId(), "added a comment: " + commentDTO.getComm() ,false);
        notificationService.createNotification(notificationDTO);
        return notificationDTO;
    }




}
