package com.licenta.bechefbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.messaging.handler.annotation.SendTo;

@Getter
@Setter
@AllArgsConstructor
public class ShoppingListDTO {
    String name;
    Long userId;
}
