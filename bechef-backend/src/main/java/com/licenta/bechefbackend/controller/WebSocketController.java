package com.licenta.bechefbackend.controller;
import com.licenta.bechefbackend.DTO.*;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.services.ChatThreadService;
import com.licenta.bechefbackend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class WebSocketController {
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    NotificationService notificationService;
    @Autowired
    ChatThreadService chatThreadService;
    @MessageMapping("/{threadId}/messages")
    @SendTo("/newMessage/{threadId}")
    public MessageResponse sendMessage(@DestinationVariable String threadId,@Payload MessageDTO messageDTO)
    {

        MessageResponse msResponse = new MessageResponse(messageDTO.getMessage(), messageDTO.getSenderId(),
                messageDTO.getThreadId());
    return msResponse;
    }

    @MessageMapping("/{threadId}/newMessage")
    public void newMessageNotification(@DestinationVariable String threadId, @Payload MessageDTO messageDTO)
    {
        ChatThread thread = chatThreadService.findById(Long.valueOf(threadId));
        List<User> users  = thread.getSubscribedByUsers();

        for(User user : users)
        {
            System.out.println(messageDTO.getThreadId());
            NotificationDTO notificationDTO = new NotificationDTO(messageDTO.getSenderId(), user.getId(),null,
                    messageDTO.getThreadId(), messageDTO.getMessage(),false, "message");
            notificationService.createNotification(notificationDTO);
            simpMessagingTemplate.convertAndSend("/newNotification/" + user.getId(), notificationDTO);

        }

    }

    @MessageMapping("/{userId}/like")
    @SendTo("/newNotification/{userId}")
    public NotificationDTO addLike(@DestinationVariable String userId, @Payload LikeDTO likeDTO)
    {

        NotificationDTO notificationDTO = new NotificationDTO(likeDTO.getLikerId(), likeDTO.getLikedId(),
                likeDTO.getRecipeId(),null, "liked your recipe" ,false, "like");
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
                commentDTO.getRecipeId(), null,"added a comment: " + commentDTO.getComm() ,false, "comment");
        notificationService.createNotification(notificationDTO);
        return notificationDTO;
    }




}
