package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Recipe;
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
    @Query("UPDATE Recipe r " + "SET r.name = ?1, r.description = ?2 WHERE r.id = ?3")
    int updateRecipe(String name, String description,Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Recipe r " + "SET r.image = ?1 WHERE r.id = ?2")
    int updateImage(String image,Long id);

    @Query("SELECT r FROM Recipe r Where r.user.id = ?1")
    List<Recipe> findAllByUserId(Long userId);

    @Query("SELECT r FROM Recipe r Where r.name = ?1")
    List<Recipe> findAllByName(String name);
}
