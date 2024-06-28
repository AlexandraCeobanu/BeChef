package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Item;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends CrudRepository<Item,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Item i " + "SET i.checked = ?1 WHERE i.id = ?2")
    int updateChecked(Boolean value,Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Item i " + "SET i.quantity = ?1 WHERE i.id = ?2")
    int updateQuantity(String value,Long id);


    @Query("SELECT i FROM Item i WHERE i.shoppingList.id =?1")
    List<Item> findByShoppingListId(Long listId);
}
