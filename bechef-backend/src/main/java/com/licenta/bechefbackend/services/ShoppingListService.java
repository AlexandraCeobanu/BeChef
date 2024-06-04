package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ItemDTO;
import com.licenta.bechefbackend.DTO.ShoppingListDTO;
import com.licenta.bechefbackend.DTO.ShoppingListResponseDTO;
import com.licenta.bechefbackend.DTO.StockItemDTO;
import com.licenta.bechefbackend.email.EmailSender;
import com.licenta.bechefbackend.entities.*;
import com.licenta.bechefbackend.registration.token.ConfirmationToken;
import com.licenta.bechefbackend.repository.ItemRepository;
import com.licenta.bechefbackend.repository.ShoppingListRepository;
import com.licenta.bechefbackend.repository.StockItemRepository;
import com.licenta.bechefbackend.repository.UserRepository;
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
    private final EmailSender emailSender;

    public ShoppingListResponseDTO createShoppingList(ShoppingListDTO shoppingListDTO){
        User user = userRepository.findById(shoppingListDTO.getUserId()).orElse(null);
        ShoppingList shoppingList = new ShoppingList(user,new ArrayList<>(),shoppingListDTO.getName());
        ShoppingList savedList = shoppingListRepository.save(shoppingList);
        ShoppingListResponseDTO shoppingListResponseDTO = new ShoppingListResponseDTO(savedList.getId(),savedList.getName()
        ,savedList.getUser().getId(),savedList.getItems());
        return shoppingListResponseDTO;
    }
    public ShoppingList addItems(Long id,List<StockItemDTO> itemsDTO) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        List<Item> items = new ArrayList<>();
        for(StockItemDTO itemDTO: itemsDTO)
        {
            Item item = new Item(shoppingList, itemDTO.getItem(),itemDTO.getQuantity());
            itemRepository.save(item);
            items.add(item);
        }
        shoppingList.getItems().addAll(items);

        return shoppingListRepository.save(shoppingList);
    }

    public ShoppingList getShoppingList(Long userId) {

//        ShoppingList shoppingList = shoppingListRepository.findByUserId(userId).orElse(null);
//        return shoppingList;
        return null;
    }

    public ShoppingList deleteItem(Long id) {

        Item item = itemRepository.findById(id).orElse(null);
        Long listId = item.getShoppingList().getId();
        itemRepository.deleteById(id);
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);

        StockItem stockItem  = stockItemRepository.findByItemShoppingId(id).orElse(null);
        if(stockItem != null)
        stockItemRepository.updateItemShoppingListId(stockItem.getId());

        return shoppingList;
    }


    public void checkedItem(Long id, Boolean value) {


        Item item = itemRepository.findById(id).orElse(null);
        Long listId = item.getShoppingList().getId();
        itemRepository.updateChecked(value,id);


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

    }

    public void addIngredients(Long userId, List<Ingredient> ingredients) {

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
//        }


    }

    public List<ShoppingListResponseDTO> getShoppingLists(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        List<ShoppingList> lists = shoppingListRepository.findByUserId(userId);
        List<ShoppingList> collabsList = user.getShoppingListsColab();
        lists.addAll(collabsList);
        List<ShoppingListResponseDTO> listsResponse = new ArrayList<>();
        for(ShoppingList list: lists)
        {
            ShoppingListResponseDTO shoppingListDTO = new ShoppingListResponseDTO(list.getId(),
                  list.getName(), list.getUser().getId(), list.getItems());
            listsResponse.add(shoppingListDTO);
        }
        return listsResponse;
    }

    public ShoppingList addCollaborator(Long id, Long userId) {

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
            userRepository.save(user);}

//            if(!shoppingList.getCollaborators().contains(user))
//            shoppingList.getCollaborators().add(user);
            ShoppingList shoppingList2 = shoppingListRepository.findById(id).orElse(null);
//            ShoppingListDTO shoppingListDTO = new ShoppingListDTO(
//                    shoppingList2.getName(), shoppingList2.getUser().getId(), shoppingList2.getItems());
            return shoppingList2;

        }
    }

    public void deleteList(Long id) {
        shoppingListRepository.deleteById(id);
    }
}
