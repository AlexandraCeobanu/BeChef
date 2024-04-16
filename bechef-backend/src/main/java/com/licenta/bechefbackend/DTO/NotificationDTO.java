package com.licenta.bechefbackend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDTO {
    Long senderId;
    Long receiverId;
    Long recipeId;
    String message;
    Boolean read;
}
