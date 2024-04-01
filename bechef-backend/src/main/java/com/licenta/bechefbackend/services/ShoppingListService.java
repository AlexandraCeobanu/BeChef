package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ItemDTO;
import com.licenta.bechefbackend.entities.Item;
import com.licenta.bechefbackend.entities.ShoppingList;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.ItemRepository;
import com.licenta.bechefbackend.repository.ShoppingListRepository;
import com.licenta.bechefbackend.repository.UserRepository;
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
            Item item = new Item(shoppingList, itemDTO.getItem());
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
        return shoppingList;
    }
}
