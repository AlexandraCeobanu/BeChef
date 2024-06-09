package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.*;
import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.Invitation;
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
            ShoppingListResponseDTO shoppingList = shoppingListService.getShoppingList(id);
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
        ShoppingListResponseDTO shoppingList = shoppingListService.addItems(id,itemsDTO);
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
            ShoppingListResponseDTO shoppingList = shoppingListService.deleteItem(id);
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

            return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.checkedItem(id,value));
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @PatchMapping("/addIngredients")
    public ResponseEntity<?> addIngredients(@RequestParam Long userId, @RequestBody Long recipeId)
    {
        try {
            shoppingListService.addIngredients(userId,recipeId);
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
            ShoppingListResponseDTO shoppingList = shoppingListService.addCollaborator(id,Long.valueOf(userId));
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
//    @GetMapping("/{id}/invitations")
//    public ResponseEntity<?> getInvitation(@PathVariable Long id, @RequestParam Long senderId, @RequestParam Long receiverId)
//    {
//        try {
//            Invitation invitation = shoppingListService.getInvitation(id,senderId,receiverId);
//            return ResponseEntity.status(HttpStatus.OK).body(invitation);
//        }
//        catch (IllegalStateException e)
//        {
//            System.out.println(e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
//        }
//        catch(Exception e)
//        {
//            System.out.println(e);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
//        }
//    }
@GetMapping("/{id}/invitations")
public ResponseEntity<?> getInvitations(@PathVariable Long id)
{
    try {
        List<InvitationDTO> invitations= shoppingListService.getInvitations(id);
        return ResponseEntity.status(HttpStatus.OK).body(invitations);
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
    @PatchMapping("/{id}/invitations")
    public ResponseEntity<?> declineInvitation(@PathVariable Long id, @RequestParam Long receiverId)
    {
        try {
            shoppingListService.declineInvitation(id,receiverId);
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
    @PostMapping("/{id}/invitations")
    public ResponseEntity<?> createInvitation(@PathVariable Long id, @RequestParam String email)
    {
        try {

            return ResponseEntity.status(HttpStatus.OK).body(shoppingListService.createInvitation(id,email));
        }
        catch (IllegalStateException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @DeleteMapping("/{listId}/invitations/{id}")
    public ResponseEntity<?> deleteInvitation(@PathVariable Long listId, @PathVariable Long id)
    {
        try {
            shoppingListService.deleteInvitation(id);
            return ResponseEntity.status(HttpStatus.OK).body("");
        }
        catch (IllegalStateException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
