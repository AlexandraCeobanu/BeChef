package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.ItemDTO;
import com.licenta.bechefbackend.DTO.StockItemDTO;
import com.licenta.bechefbackend.entities.ShoppingList;
import com.licenta.bechefbackend.entities.StockItem;
import com.licenta.bechefbackend.entities.StockList;
import com.licenta.bechefbackend.services.ShoppingListService;
import com.licenta.bechefbackend.services.StockListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stockList")
public class StockListController {

    @Autowired
    StockListService stockListService;

    @GetMapping
    public ResponseEntity<?> getStockList(@RequestParam Long userId)
    {
        try {
            StockList stockList = stockListService.getStockList(userId);
            return ResponseEntity.status(HttpStatus.OK).body(stockList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> addItemsToStockList(@PathVariable Long id, @RequestBody List<StockItemDTO> itemsDTO)
    {
        try {
            StockList stockList = stockListService.addItems(id,itemsDTO);
            return ResponseEntity.status(HttpStatus.OK).body(stockList);
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
            StockList stockList = stockListService.deleteItem(id);
            return ResponseEntity.status(HttpStatus.OK).body(stockList);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PatchMapping("/items/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id,@RequestBody StockItemDTO stockItemDTO )
    {
        try {

            return ResponseEntity.status(HttpStatus.OK).body(stockListService.updateItem(id,stockItemDTO));
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/items/{id}")
    public ResponseEntity<?> getItem(@PathVariable Long id)
    {
        try {
            StockItem stockItem = stockListService.getItem(id);
            return ResponseEntity.status(HttpStatus.OK).body(stockItem);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
