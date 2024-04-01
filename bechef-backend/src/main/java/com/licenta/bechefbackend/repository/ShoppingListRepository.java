package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.ShoppingList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShoppingListRepository extends CrudRepository<ShoppingList,Long> {
    @Query("Select s from ShoppingList s WHERE s.user.id =?1")
    Optional<ShoppingList> findByUserId(Long userId);
}
