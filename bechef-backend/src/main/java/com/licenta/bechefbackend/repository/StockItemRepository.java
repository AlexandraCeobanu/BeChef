package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.StockItem;
import com.licenta.bechefbackend.entities.StockList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockItemRepository extends CrudRepository<StockItem,Long> {

}
