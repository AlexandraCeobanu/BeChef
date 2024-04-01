package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ItemDTO;
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

    public StockList addItems(Long id, List<ItemDTO> itemsDTO) {
        StockList stockList = stockListRepository.findById(id).orElse(null);
        List<StockItem> items = new ArrayList<>();
        for(ItemDTO itemDTO: itemsDTO)
        {
            StockItem item = new StockItem(stockList, itemDTO.getItem());
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
        itemRepository.deleteById(id);
        StockList stockList = stockListRepository.findById(listId).orElse(null);
        return stockList;
    }
}
