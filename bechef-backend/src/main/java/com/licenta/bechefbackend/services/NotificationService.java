package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ChatThreadResponse;
import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.*;
import com.licenta.bechefbackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.cdi.Eager;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class NotificationService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    ChatThreadRepository chatThreadRepository;
    @Autowired
    StockItemRepository stockItemRepository;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @Autowired
    private ShoppingListRepository shoppingListRepository;



    public void ingredientExpired(Long userId, String message,Long itemId )
    {
        NotificationDTO notificationDTO = new NotificationDTO(userId, Long.valueOf(userId),
                null,null, itemId,null, message ,false, "expires");
        createNotification(notificationDTO);
        simpMessagingTemplate.convertAndSend("/newNotification/" + userId, notificationDTO);

    }

    public void createNotification(NotificationDTO notificationDTO)
    {
        try{
        User senderUser = userRepository.findById(notificationDTO.getSenderId()).orElse(null);
        User receiverUser = userRepository.findById(notificationDTO.getReceiverId()).orElse(null);
        Notification notification = new Notification(senderUser,receiverUser,null,null,null,null, notificationDTO.getMessage(),
                notificationDTO.getType());
        if(!notificationDTO.getType().equals("message") && !notificationDTO.getType().equals("expires") && !notificationDTO.getType().equals("list"))
        {
            Recipe recipe = recipeRepository.findById(notificationDTO.getRecipeId()).orElse(null);
            notification.setRecipe(recipe);
        }
        else if(notificationDTO.getType().equals("message")) {
            ChatThread thread = chatThreadRepository.findById(notificationDTO.getThreadId()).orElse(null);
            notification.setThread(thread);
        }
        else if(notificationDTO.getType().equals("expires")) {
            StockItem stockItem = stockItemRepository.findById(notificationDTO.getStockItemId()).orElse(null);
            notification.setStockItem(stockItem);
        }
        else{
            ShoppingList shoppingList = shoppingListRepository.findById(notificationDTO.getListId()).orElse(null);
            notification.setList(shoppingList);
        }
        notificationRepository.save(notification);}
        catch (Exception e)
        {
            System.out.println(e);
        }
    }

    public List<NotificationDTO> getAllNotificationByUserId(Long userId)
    {
        List<Notification> notifications = notificationRepository.findAllByUserId(userId);
        List<NotificationDTO> notificationDTOS = new ArrayList<>();
        for(Notification not: notifications)
        {
            NotificationDTO notDTO = new NotificationDTO(not.getSenderUser().getId(),
                    not.getReceiverUser().getId(), null,null,null,null,not.getMessage(),not.getIsRead(), not.getType());
            if(not.getType().equals("message"))
            {
                notDTO.setThreadId(not.getThread().getId());
            }
            else if(not.getType().equals("expires")) {

                notDTO.setStockItemId(not.getStockItem().getId());
            }
            else if(not.getType().equals("list"))
            {
                notDTO.setListId(not.getList().getId());
            }
            else {
                notDTO.setRecipeId(not.getRecipe().getId());
            }
            notificationDTOS.add(notDTO);
        }
        Collections.reverse(notificationDTOS);
        return notificationDTOS;
    }

    public void readAllNotificationByUserId(Long userId) {

        try {
            notificationRepository.readAllNotifications(userId);
        }
        catch(Exception e)
        {
            System.out.println(e);
        }
    }

    public Long getNumberOfUnreadNotifications(Long userId) {

        Long number = notificationRepository.findNumberOfUnreadNotifications(userId);
        return number;
    }
}
