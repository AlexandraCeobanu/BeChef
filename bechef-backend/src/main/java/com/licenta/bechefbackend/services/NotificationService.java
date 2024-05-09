package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ChatThreadResponse;
import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.Notification;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.ChatThreadRepository;
import com.licenta.bechefbackend.repository.NotificationRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public void createNotification(NotificationDTO notificationDTO)
    {
        try{
        User senderUser = userRepository.findById(notificationDTO.getSenderId()).orElse(null);
        User receiverUser = userRepository.findById(notificationDTO.getReceiverId()).orElse(null);
        Notification notification = new Notification(senderUser,receiverUser,null,null, notificationDTO.getMessage(),
                notificationDTO.getType());
        if(!notificationDTO.getType().equals("message"))
        {
            Recipe recipe = recipeRepository.findById(notificationDTO.getRecipeId()).orElse(null);
            notification.setRecipe(recipe);
        }
        else {
            ChatThread thread = chatThreadRepository.findById(notificationDTO.getThreadId()).orElse(null);
            notification.setThread(thread);
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
                    not.getReceiverUser().getId(), null,null,not.getMessage(),not.getIsRead(), not.getType());
            if(not.getType().equals("message"))
            {
                notDTO.setThreadId(not.getThread().getId());
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
