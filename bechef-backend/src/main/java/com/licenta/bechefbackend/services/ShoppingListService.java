package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ItemDTO;
import com.licenta.bechefbackend.entities.*;
import com.licenta.bechefbackend.repository.ItemRepository;
import com.licenta.bechefbackend.repository.ShoppingListRepository;
import com.licenta.bechefbackend.repository.StockItemRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
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

    public ShoppingList createShoppingList(Long userId){
        User user = userRepository.findById(userId).orElse(null);
        ShoppingList shoppingList = new ShoppingList(user,new ArrayList<>());
        return shoppingListRepository.save(shoppingList);
    }
    public ShoppingList addItems(Long id,List<ItemDTO> itemsDTO) {
        ShoppingList shoppingList = shoppingListRepository.findById(id).orElse(null);
        List<Item> items = new ArrayList<>();
        for(ItemDTO itemDTO: itemsDTO)
        {
            Item item = new Item(shoppingList, itemDTO.getItem(),itemDTO.getQuantity());
            itemRepository.save(item);
            items.add(item);
        }
        shoppingList.getItems().addAll(items);
        shoppingListRepository.save(shoppingList);
        return shoppingList;
    }

    public ShoppingList getShoppingList(Long userId) {

        ShoppingList shoppingList = shoppingListRepository.findByUserId(userId).orElse(null);
        return shoppingList;
    }

    public ShoppingList deleteItem(Long id) {
        Item item = itemRepository.findById(id).orElse(null);
        Long listId = item.getShoppingList().getId();
        itemRepository.deleteById(id);
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElse(null);

        StockItem stockItem  = stockItemRepository.findByItemShoppingId(id).orElse(null);
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

        ShoppingList shoppingList = shoppingListRepository.findByUserId(userId).orElse(null);
        StockList stockList = stockListService.getStockList(userId);
        List<StockItem> items = stockList.getItems();
        List<Item> itemsToAdd = new ArrayList<>();
        if(shoppingList != null && stockList!=null )
        {
            for(Ingredient ingredient : ingredients)
            {
                Boolean found = false;
                for (StockItem item : items) {

                    if (ingredient.getName().equals(item.getItem())) {
                        found = true;
                        break;
                    }

                }
                if(found == false){
                Item item = new Item(shoppingList, ingredient.getName(), ingredient.getQuantity());
                itemRepository.save(item);
                itemsToAdd.add(item);
                }
            }
            shoppingList.getItems().addAll(itemsToAdd);
            shoppingListRepository.save(shoppingList);
        }

    }
}
