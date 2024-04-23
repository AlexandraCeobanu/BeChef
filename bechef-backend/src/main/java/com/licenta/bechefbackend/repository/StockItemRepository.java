package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.StockItem;
import com.licenta.bechefbackend.entities.StockList;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StockItemRepository extends CrudRepository<StockItem,Long> {

    @Query("SELECT s FROM StockItem s WHERE s.idItemShoppingList = ?1")
    Optional<StockItem> findByItemShoppingId(Long idItemShoppingList);

    @Transactional
    @Modifying
    @Query("UPDATE StockItem s " + "SET s.idItemShoppingList=null WHERE s.id = ?1")
    void updateItemShoppingListId(Long id);

    @Query("SELECT s.item FROM StockItem s Where s.id = ?1")
    List<String> findItemsNames(Long stockListId);
}
