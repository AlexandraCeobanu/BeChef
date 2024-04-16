package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.entities.Notification;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.NotificationRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    NotificationRepository notificationRepository;
    public void createNotification(NotificationDTO notificationDTO)
    {
        User senderUser = userRepository.findById(notificationDTO.getSenderId()).orElse(null);
        User receiverUser = userRepository.findById(notificationDTO.getReceiverId()).orElse(null);
        Recipe recipe = recipeRepository.findById(notificationDTO.getRecipeId()).orElse(null);
        Notification notification = new Notification(senderUser,receiverUser,recipe, notificationDTO.getMessage());
        notificationRepository.save(notification);
    }

    public List<NotificationDTO> getAllNotificationByUserId(Long userId)
    {
        List<NotificationDTO> notifications = notificationRepository.findAllByUserId( userId);
        return notifications;
    }
}
