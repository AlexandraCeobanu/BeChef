package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ItemDTO;
import com.licenta.bechefbackend.DTO.StockItemDTO;
import com.licenta.bechefbackend.entities.*;
import com.licenta.bechefbackend.repository.ItemRepository;
import com.licenta.bechefbackend.repository.StockItemRepository;
import com.licenta.bechefbackend.repository.StockListRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockListService {

    @Autowired
    StockListRepository stockListRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ItemRepository itemRepository;
    @Autowired
    StockItemRepository stockItemRepository;

    public StockList createStockList(Long userId){
        User user = userRepository.findById(userId).orElse(null);
        StockList stockList = new StockList(user,new ArrayList<>());
        return stockListRepository.save(stockList);
    }
    public StockList getStockList(Long userId) {
        StockList stockList = stockListRepository.findByUserId(userId).orElse(null);
        return stockList;
    }

    public StockList addItems(Long id, List<StockItemDTO> itemsDTO) {
        StockList stockList = stockListRepository.findById(id).orElse(null);
        List<StockItem> items = new ArrayList<>();
        for(StockItemDTO itemDTO: itemsDTO)
        {
            System.out.println(itemDTO.getExpirationDate());
            StockItem item = new StockItem(stockList, itemDTO.getItem(),itemDTO.getQuantity(),itemDTO.getExpirationDate());
            stockItemRepository.save(item);
            items.add(item);
        }
        stockList.getItems().addAll(items);
        stockListRepository.save(stockList);
        return stockList;
    }


    public StockList deleteItem(Long id) {
        StockItem item = stockItemRepository.findById(id).orElse(null);
        Long listId = item.getStockList().getId();
        stockItemRepository.deleteById(id);
        StockList stockList = stockListRepository.findById(listId).orElse(null);
        return stockList;
    }

    public StockList addItemFromShoppingList(Long userId, ItemDTO itemDTO,Long idItemShoppingList) {
        StockList stockList = stockListRepository.findByUserId(userId).orElse(null);
        StockItem item = new StockItem(stockList, itemDTO.getItem(),itemDTO.getQuantity(),null);
        item.setIdItemShoppingList(idItemShoppingList);
        stockItemRepository.save(item);
        stockList.getItems().add(item);
        stockListRepository.save(stockList);
        return stockList;
    }

    public void deleteItemFromShoppingList(Long userId, Long idItemShoppingList) {
        StockList stockList = stockListRepository.findByUserId(userId).orElse(null);
        StockItem stockItem = stockItemRepository.findByItemShoppingId(idItemShoppingList).orElse(null);
        if(stockItem!=null)
        stockItemRepository.deleteById(stockItem.getId());

    }

    public List<String> getItemsNames(Long id) {


        List<String> itemsNames = stockItemRepository.findItemsNames(id);
        return itemsNames;
    }

    public StockItem getItem(Long id) {
        return stockItemRepository.findById(id).orElse(null);
    }
    public List<StockItem> getAllStockItmes()
    {
        return (List<StockItem>) stockItemRepository.findAll();
    }
    public List<StockItem> getItemsByListId(Long id)
    {
        return (List<StockItem>) stockItemRepository.findAllByListId(id);
    }

    public StockList updateItem(Long id, StockItemDTO stockItemDTO) {

        StockItem stockItem = stockItemRepository.findById(id).orElse(null);
        stockItem.setExpirationDate(stockItemDTO.getExpirationDate());
        stockItemRepository.save(stockItem);
        return stockListRepository.findById(stockItem.getStockList().getId()).orElse(null);
    }

    public void deleteStockList(Long id) {
        StockList stockList = stockListRepository.findById(id).orElse(null);
        List<StockItem> items = stockList.getItems();
        for(StockItem item : items)
        {
            stockItemRepository.deleteById(item.getId());
        }
        stockList.setItems(null);
        stockListRepository.save(stockList);
    }
}
