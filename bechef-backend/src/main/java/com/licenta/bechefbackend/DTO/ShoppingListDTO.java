package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.messaging.handler.annotation.SendTo;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ShoppingListDTO {
    String name;
    Long userId;
    private List<Item> items;
}
