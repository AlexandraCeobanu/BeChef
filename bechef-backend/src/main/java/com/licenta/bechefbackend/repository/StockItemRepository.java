package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.StockItem;
import com.licenta.bechefbackend.entities.StockList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockItemRepository extends CrudRepository<StockItem,Long> {

    @Query("SELECT s FROM StockItem s WHERE s.idItemShoppingList = ?1")
    Optional<StockItem> findByItemShoppingId(Long idItemShoppingList);
}
