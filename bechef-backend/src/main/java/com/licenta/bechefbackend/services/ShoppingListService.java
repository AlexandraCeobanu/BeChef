package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.*;
import com.licenta.bechefbackend.email.EmailSender;
import com.licenta.bechefbackend.entities.*;
import com.licenta.bechefbackend.registration.token.ConfirmationToken;
import com.licenta.bechefbackend.repository.*;
import io.swagger.models.auth.In;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShoppingListService {
    @Autowired
    ShoppingListRepository shoppingListRepository;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    StockListService stockListService;
    @Autowired
    StockItemRepository stockItemRepository;
    @Autowired
    InvitationRepository invitationRepository;
    @Autowired
    RecipeRepository recipeRepository;


    public ShoppingListResponseDTO createShoppingList(ShoppingListDTO shoppingListDTO){
        User user = userRepository.findById(shoppingListDTO.getUserId()).orElse(null);
        ShoppingList shoppingList = new ShoppingList(user,new ArrayList<>(),shoppingListDTO.getName());
        ShoppingList savedList = shoppingListRepository.save(shoppingList);
        ShoppingListResponseDTO shoppingListResponseDTO = new ShoppingListResponseDTO(savedList.getId(),savedList.getName()
        ,savedList.getUser().getId(),savedList.getItems(),null);
        return shoppingListResponseDTO;
    }
    public ShoppingListResponseDTO addItems(Long id,List<StockItemDTO> itemsDTO) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        List<Item> items = new ArrayList<>();
        for(StockItemDTO itemDTO: itemsDTO)
        {
            Item item = new Item(shoppingList, itemDTO.getItem(),itemDTO.getQuantity());
            itemRepository.save(item);
            items.add(item);
        }
        shoppingList.getItems().addAll(items);
        ShoppingList newList = shoppingListRepository.save(shoppingList);

        ShoppingListResponseDTO shoppingListDTO;
        if(newList.getRecipe()!= null)
        {
            shoppingListDTO = new ShoppingListResponseDTO(newList.getId(),
                    newList.getName(), newList.getUser().getId(), newList.getItems(), newList.getRecipe().getId());
        }
        else
        {
            shoppingListDTO = new ShoppingListResponseDTO(newList.getId(),
                    newList.getName(), newList.getUser().getId(), newList.getItems(), null);
        }
        return shoppingListDTO;


    }

    public ShoppingListResponseDTO getShoppingList(Long id) {

        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        ShoppingListResponseDTO shoppingListDTO;
        if(shoppingList.getRecipe()!= null)
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), shoppingList.getRecipe().getId());
        }
        else
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), null);
        }
        return shoppingListDTO;
    }

    public ShoppingListResponseDTO deleteItem(Long id) {

        Item item = itemRepository.findById(id).orElse(null);
        Long listId = item.getShoppingList().getId();
        itemRepository.deleteById(id);
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);
        shoppingList.getItems().remove(item);
        StockItem stockItem  = stockItemRepository.findByItemShoppingId(id).orElse(null);
        if(stockItem != null)
        stockItemRepository.updateItemShoppingListId(stockItem.getId());
        ShoppingListResponseDTO shoppingListDTO;
        if(shoppingList.getRecipe()!= null)
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), shoppingList.getRecipe().getId());
        }
        else
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), null);
        }
        return shoppingListDTO;
    }

    @Transactional
    public ShoppingListResponseDTO checkedItem(Long id, Boolean value) {

        itemRepository.updateChecked(value,id);
        Item item = itemRepository.findById(id).orElse(null);
        if(item!= null){
        Long listId = item.getShoppingList().getId();

       ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);
       Long userId = shoppingList.getUser().getId();
       if(value == true) {
        List<ItemDTO> items = new ArrayList<>();
        ItemDTO itemDTO = new ItemDTO(item.getItem(), item.getQuantity());
        items.add(itemDTO);
        stockListService.addItemFromShoppingList(userId,itemDTO,id);}
       else
       {
           stockListService.deleteItemFromShoppingList(userId,id);
       }
        ShoppingListResponseDTO shoppingListDTO;
        if(shoppingList.getRecipe()!= null)
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), shoppingList.getRecipe().getId());
        }
        else
        {
            shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                    shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), null);
        }
        return shoppingListDTO;}
        return null;
    }

    @Transactional
    public ShoppingListResponseDTO updateQuantity(Long id, String value) {

        itemRepository.updateQuantity(value,id);
        Item item = itemRepository.findById(id).orElse(null);
        if(item!= null){
            Long listId = item.getShoppingList().getId();
            ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);
            ShoppingListResponseDTO shoppingListDTO;
            if(shoppingList.getRecipe()!= null)
            {
                shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                        shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), shoppingList.getRecipe().getId());
            }
            else
            {
                shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                        shoppingList.getName(), shoppingList.getUser().getId(), shoppingList.getItems(), null);
            }
            return shoppingListDTO;}
        return null;
    }

    public void addIngredients(Long userId, Long recipeId) {

        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);
        if(recipe != null)
        {
            ShoppingList shoppingList = new ShoppingList(user,null,recipe.getName());
            shoppingList.setRecipe(recipe);
            shoppingListRepository.save(shoppingList);
            List<Ingredient> ingredients = recipe.getIngredients();
            List<Item> itemsToAdd = new ArrayList<>();
            for(Ingredient ingredient : ingredients) {
                Item item = new Item(shoppingList, ingredient.getName(), ingredient.getQuantity());
                itemRepository.save(item);
                itemsToAdd.add(item);
            }
            shoppingList.setItems(itemsToAdd);
            shoppingListRepository.save(shoppingList);

        }
//        ShoppingList shoppingList = shoppingListRepository.findByUserId(userId).orElse(null);
//        StockList stockList = stockListService.getStockList(userId);
//        List<StockItem> items = stockList.getItems();
//        List<Item> itemsToAdd = new ArrayList<>();
//        if(shoppingList != null && stockList!=null )
//        {
//            for(Ingredient ingredient : ingredients)
//            {
//                Boolean found = false;
//                for (StockItem item : items) {
//
//                    if (ingredient.getName().equals(item.getItem())) {
//                        found = true;
//                        break;
//                    }
//
//                }
//                if(found == false){
//                Item item = new Item(shoppingList, ingredient.getName(), ingredient.getQuantity());
//                itemRepository.save(item);
//                itemsToAdd.add(item);
//                }
//            }
//            shoppingList.getItems().addAll(itemsToAdd);
//            shoppingListRepository.save(shoppingList);
        }

    public List<ShoppingListResponseDTO> getShoppingLists(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<ShoppingList> lists = shoppingListRepository.findByUserId(userId);
        List<ShoppingList> collabsList = user.getShoppingListsColab();
        lists.addAll(collabsList);
        List<ShoppingListResponseDTO> listsResponse = new ArrayList<>();
        for(ShoppingList list: lists)
        {
            ShoppingListResponseDTO shoppingListDTO;
            if(list.getRecipe()!= null)
            {
                shoppingListDTO = new ShoppingListResponseDTO(list.getId(),
                        list.getName(), list.getUser().getId(), list.getItems(), list.getRecipe().getId());
            }
            else
            {
                shoppingListDTO = new ShoppingListResponseDTO(list.getId(),
                        list.getName(), list.getUser().getId(), list.getItems(), null);
            }
            listsResponse.add(shoppingListDTO);
        }
        return listsResponse;
    }

    public ShoppingListResponseDTO addCollaborator(Long id, Long userId) {

        User user = userRepository.findById(userId).orElse(null);
        if(user == null)
        {
            throw  new IllegalStateException("User not found");
        }
        else
        {
            ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
            if(!user.getShoppingListsColab().contains(shoppingList))
            { user.getShoppingListsColab().add(shoppingList);
            userRepository.save(user);
            Invitation invitation = invitationRepository.findByAll(shoppingList.getUser().getId(), userId, shoppingList.getId()).orElse(null);
            if(invitation != null)
            {
                invitation.setStatus("accepted");
                invitationRepository.save(invitation);
            }
            }
            ShoppingList shoppingList2 = shoppingListRepository.findById(id).orElse(null);
            ShoppingListResponseDTO shoppingListDTO;
            if(shoppingList2.getRecipe()!= null)
            {
                shoppingListDTO = new ShoppingListResponseDTO(shoppingList2.getId(),
                        shoppingList2.getName(), shoppingList2.getUser().getId(), shoppingList2.getItems(), shoppingList2.getRecipe().getId());
            }
            else
            {
                shoppingListDTO = new ShoppingListResponseDTO(shoppingList.getId(),
                        shoppingList2.getName(), shoppingList2.getUser().getId(), shoppingList2.getItems(), null);
            }
            return shoppingListDTO;
        }
    }

    public void deleteList(Long id) {

        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);

        List<User> collabs = shoppingList.getCollaborators();
        for(User user: collabs)
        {

            user.getShoppingListsColab().remove(shoppingList);

        }
        shoppingListRepository.deleteById(id);

    }

    public List<CollaboratorDTO> getCollaborators(Long id) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        List<CollaboratorDTO> collaboratorDTOS = new ArrayList<>();
        List<User> collabs = shoppingList.getCollaborators();
        for(User user : collabs)
        {
            CollaboratorDTO colab = new CollaboratorDTO(user.getId(),user.getEmail(),user.getUserUsername());
            collaboratorDTOS.add(colab);
        }
        return collaboratorDTOS;
    }

    public void deleteCollaborator(Long listId, Long colId) {
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);
        User user = userRepository.findById(colId).orElse(null);
        if(user != null)
        {
            user.getShoppingListsColab().remove(shoppingList);
            userRepository.save(user);
        }
    }

    public Invitation getInvitation(Long id, Long senderId, Long receiverId) {
        Invitation invitation = invitationRepository.findByAll(senderId,receiverId,id).orElse(null);
        return invitation;
    }

    public List<InvitationDTO> getInvitations(Long id) {
        List<Invitation> invitations = invitationRepository.findAllByListId(id);
        List<InvitationDTO> invitationDTOS = new ArrayList<>();
        for(Invitation inv : invitations)
        {
            if(!inv.getStatus().equals("accepted")){
            InvitationDTO invitationDTO = new InvitationDTO(inv.getId(),inv.getSender().getId(),
                    inv.getReceiver().getId(),inv.getStatus(), inv.getList().getId());
            invitationDTOS.add(invitationDTO);}
        }
        return invitationDTOS;


    }

    public void declineInvitation(Long id, Long receiverId) {
        ShoppingList list = shoppingListRepository.findById(id).orElse(null);
        Long senderId = list.getUser().getId();
        Invitation invitation = invitationRepository.findByAll(senderId,receiverId,id).orElse(null);
        invitation.setStatus("Declined");
        invitationRepository.save(invitation);
    }

    public InvitationDTO createInvitation(Long id, String email) {

        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        User user = userRepository.findByEmail(email).orElse(null);
        Invitation invitation = invitationRepository.findByAll(shoppingList.getUser().getId(),user.getId(),shoppingList.getId()).orElse(null);

        if (!shoppingList.getCollaborators().contains(user) && invitation == null) {
            Invitation newInvitation = new Invitation(shoppingList.getUser(),
                    user, shoppingList, "Pending");

            Invitation inv = invitationRepository.save(newInvitation);
            InvitationDTO invitationDTO = new InvitationDTO(inv.getId(),inv.getSender().getId(),
                    inv.getReceiver().getId(),inv.getStatus(), inv.getList().getId());
            return invitationDTO;
        }
        else {
            if(shoppingList.getCollaborators().contains(user))
                throw  new IllegalStateException("user already exists");
            else
                throw  new IllegalStateException("invitation already send");
        }
    }

    public void deleteInvitation(Long id) {
        invitationRepository.deleteById(id);
    }
}
