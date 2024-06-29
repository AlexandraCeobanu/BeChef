package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.RecipeCollection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionRepository extends CrudRepository<RecipeCollection,Long> {
    @Query("SELECT c FROM RecipeCollection c where c.user.id = ?1")
    List<RecipeCollection> findAllByUserId(Long userId);
}
