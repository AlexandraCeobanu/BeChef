package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.*;
import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.ShoppingList;
import com.licenta.bechefbackend.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/shoppingLists")
public class ShoppingListController {

    @Autowired
    ShoppingListService shoppingListService;

    @PostMapping
    public ResponseEntity<?> createShoppingList(@RequestBody ShoppingListDTO shoppingListDTO)
    {
        try {
            ShoppingListResponseDTO shoppingList = shoppingListService.createShoppingList(shoppingListDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(shoppingList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShoppingList(@PathVariable Long id)
    {
        try {
            ShoppingList shoppingList = shoppingListService.getShoppingList(id);
            return ResponseEntity.status(HttpStatus.OK).body(shoppingList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping
    public ResponseEntity<?> getShoppingLists(@RequestParam Long userId)
    {
        try {
            List<ShoppingListResponseDTO> shoppingList = shoppingListService.getShoppingLists(userId);
            return ResponseEntity.status(HttpStatus.OK).body(shoppingList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> addItemsToShoppingList(@PathVariable Long id, @RequestBody List<StockItemDTO> itemsDTO)
    {
        try {
        ShoppingList shoppingList = shoppingListService.addItems(id,itemsDTO);
            return ResponseEntity.status(HttpStatus.OK).body(shoppingList);
        }
        catch(Exception e)
        {
            System.out.println(e);
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> addItemsToShoppingList(@PathVariable Long id)
    {
        try {
            shoppingListService.deleteList(id);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        catch(Exception e)
        {
            System.out.println(e);
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
            System.out.println(e);
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
    @PostMapping("/{id}/collaborators")
    public ResponseEntity<?> addCollaborator(@PathVariable Long id,@RequestBody String userId)
    {
        try {
            ShoppingList shoppingList = shoppingListService.addCollaborator(id,Long.valueOf(userId));
            return ResponseEntity.status(HttpStatus.CREATED).body(shoppingList);
        }
        catch (IllegalStateException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/{id}/collaborators")
    public ResponseEntity<?> getCollaborators(@PathVariable Long id)
    {
        try {
            List<CollaboratorDTO> collabs = shoppingListService.getCollaborators(id);
            return ResponseEntity.status(HttpStatus.OK).body(collabs);
        }
        catch (IllegalStateException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @DeleteMapping("/{listId}/collaborators")
    public ResponseEntity<?> deleteCollaborator(@PathVariable Long listId,@RequestParam Long colId)
    {
        try {
            shoppingListService.deleteCollaborator(listId,colId);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        catch (IllegalStateException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
