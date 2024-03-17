package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe,Long> {


    @Transactional
    @Modifying
    @Query("UPDATE Recipe r " + "SET r.name = ?1, r.imagePath = ?2, r.userId = ?3  WHERE r.id = ?4")
    Recipe updateRecipe(String name, String imagePath, Long userId,Long id);
}
