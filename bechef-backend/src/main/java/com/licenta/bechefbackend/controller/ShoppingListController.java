package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.ItemDTO;
import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.ShoppingList;
import com.licenta.bechefbackend.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shoppingList")
public class ShoppingListController {

    @Autowired
    ShoppingListService shoppingListService;

    @GetMapping
    public ResponseEntity<?> getShoppingList(@RequestParam Long userId)
    {
        try {
            ShoppingList shoppingList = shoppingListService.getShoppingList(userId);
            return ResponseEntity.status(HttpStatus.OK).body(shoppingList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> addItemsToShoppingList(@PathVariable Long id, @RequestBody List<ItemDTO> itemsDTO)
    {
        try {
        ShoppingList shoppingList = shoppingListService.addItems(id,itemsDTO);
            return ResponseEntity.status(HttpStatus.OK).body(shoppingList);
        }
        catch(Exception e)
        {
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @DeleteMapping("/items/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id)
    {
        try {
            ShoppingList shoppingList = shoppingListService.deleteItem(id);
            return ResponseEntity.status(HttpStatus.OK).body(shoppingList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @PatchMapping("/items/{id}")
    public ResponseEntity<?> checkedItem(@PathVariable Long id,@RequestBody Boolean value)
    {
        try {
            shoppingListService.checkedItem(id,value);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PatchMapping("/addIngredients")
    public ResponseEntity<?> addIngredients(@RequestParam Long userId, @RequestBody List<Ingredient> ingredients)
    {
        try {
            shoppingListService.addIngredients(userId,ingredients);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
