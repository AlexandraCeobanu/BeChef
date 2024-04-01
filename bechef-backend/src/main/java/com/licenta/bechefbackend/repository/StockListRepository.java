package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.ShoppingList;
import com.licenta.bechefbackend.entities.StockList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StockListRepository extends CrudRepository<StockList,Long> {
    @Query("Select s from StockList s WHERE s.user.id =?1")
    Optional<StockList> findByUserId(Long userId);
}
