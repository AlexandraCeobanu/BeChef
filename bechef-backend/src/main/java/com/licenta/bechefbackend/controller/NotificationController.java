package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.NotificationDTO;
import com.licenta.bechefbackend.services.NotificationService;
import org.eclipse.persistence.exceptions.EclipseLinkException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    @Autowired
    NotificationService notificationService;
    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getAllNotifications(@RequestParam Long userId)
    {
        try {
        List<NotificationDTO> notificationDTOS = notificationService.getAllNotificationByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(notificationDTOS);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
    @PatchMapping
    public ResponseEntity<?> readAllNotifications(@RequestParam Long userId)
    {
        try {
            notificationService.readAllNotificationByUserId(userId);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }
}
