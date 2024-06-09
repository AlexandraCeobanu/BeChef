package com.licenta.bechefbackend.controller;
import com.licenta.bechefbackend.DTO.*;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.Invitation;
import com.licenta.bechefbackend.entities.ShoppingList;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.InvitationRepository;
import com.licenta.bechefbackend.repository.ShoppingListRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import com.licenta.bechefbackend.services.ChatThreadService;
import com.licenta.bechefbackend.services.NotificationService;
import com.licenta.bechefbackend.services.ShoppingListService;
import com.licenta.bechefbackend.services.UserService;
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

    @Autowired
    UserRepository userRepository;
    @Autowired
    ShoppingListRepository shoppingListRepository;



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
                    messageDTO.getThreadId(),null,null, messageDTO.getMessage(),false, "message");
            notificationService.createNotification(notificationDTO);
            simpMessagingTemplate.convertAndSend("/newNotification/" + user.getId(), notificationDTO);

        }

    }

    @MessageMapping("/{userId}/like")
    @SendTo("/newNotification/{userId}")
    public NotificationDTO addLike(@DestinationVariable String userId, @Payload LikeDTO likeDTO)
    {
        if(likeDTO.getLikerId() != likeDTO.getLikedId()){
        NotificationDTO notificationDTO = new NotificationDTO(likeDTO.getLikerId(), likeDTO.getLikedId(),
                likeDTO.getRecipeId(),null,null, null,"liked your recipe" ,false, "like");
        notificationService.createNotification(notificationDTO);
        return notificationDTO;}
        return null;
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

        if(commentDTO.getSenderId() != commentDTO.getReceiverId()){
        NotificationDTO notificationDTO = new NotificationDTO(commentDTO.getSenderId(), commentDTO.getReceiverId(),
                commentDTO.getRecipeId(), null,null,null,"added a comment: " + commentDTO.getComm() ,false, "comment");
        notificationService.createNotification(notificationDTO);
        return notificationDTO;}
        return null;
    }


    @SendTo("/newNotification/{userId}")
    public NotificationDTO ingredientExpired(@DestinationVariable String userId)
    {
            NotificationDTO notificationDTO = new NotificationDTO(Long.valueOf(userId), Long.valueOf(userId),
                    null,null,null,null, "ingredient expires" ,false, "like");
            notificationService.createNotification(notificationDTO);
            return notificationDTO;
    }

    @MessageMapping("/{id}/shareShoppingList")
    public void newShareShoppingListNotification(@DestinationVariable String id, @Payload String email)
    {
        System.out.println(id);
        System.out.println(email);
        User user = userRepository.findByEmail(email).orElse(null);
        if(user == null)
        {
            throw  new IllegalStateException("User not found");
        }
        else
        {
            ShoppingList shoppingList = shoppingListRepository.findById(Long.valueOf(id)).orElse(null);
            String message =  " shared a shopping list";
            NotificationDTO notificationDTO = new NotificationDTO(shoppingList.getUser().getId(), user.getId(),null,
                    null,null,Long.valueOf(id), message,false, "list");
            notificationService.createNotification(notificationDTO);
            simpMessagingTemplate.convertAndSend("/newNotification/" + user.getId(), notificationDTO);
        }

    }

    @MessageMapping("/{invitationId}/changedStatus")
    @SendTo("/changedStatus/{invitationId}")
    public String changedStatus(@DestinationVariable String invitationId,@Payload String status) {
        return status;

    }

    @MessageMapping("/{listId}/updateList")
    @SendTo("/updateList/{listId}")
    public ShoppingListResponseDTO  addItem(@DestinationVariable String listId) {
        ShoppingList shoppingList = shoppingListRepository.findById(Long.valueOf(listId)).orElse(null);
        ShoppingListResponseDTO shoppingListDTO;
        if(shoppingList.getRecipe()!= null)
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), shoppingList.getRecipe().getId());
        }
        else
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), null);
        }
        return shoppingListDTO;
    }

    @MessageMapping("/{listId}/editingList")
    @SendTo("/editingList/{listId}")
    public UserResponseDTO editingList(@DestinationVariable String listId, @Payload String userId) {
        User user = userRepository.findById(Long.valueOf(userId)).orElse(null);
        if(user != null)
        {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user.getId(),user.getEmail(),user.getUserUsername(),
            user.getNrLikes(),user.getNrRecipes(),null,null,null,null);
            return userResponseDTO;
        }
        return null;
    }

    @MessageMapping("/{listId}/stopEditingList")
    @SendTo("/stopEditingList/{listId}")
    public UserResponseDTO stopEditingList(@DestinationVariable String listId, @Payload String userId) {
        User user = userRepository.findById(Long.valueOf(userId)).orElse(null);
        if(user != null)
        {
            UserResponseDTO userResponseDTO = new UserResponseDTO(user.getId(),user.getEmail(),user.getUserUsername(),
                    user.getNrLikes(),user.getNrRecipes(),null,null,null,null);
            return userResponseDTO;
        }
        return null;
    }

}
