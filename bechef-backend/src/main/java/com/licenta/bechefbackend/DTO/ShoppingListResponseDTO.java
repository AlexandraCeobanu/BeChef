package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
public class ShoppingListResponseDTO {

    Long id;
    String name;
    Long userId;
    private List<Item> items;
    Long recipeId;
}
