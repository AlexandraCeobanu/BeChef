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

    @Query("SELECT r FROM Recipe r Where LOWER(r.name) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Recipe> findAllByName( String name);
    @Query("SELECT r FROM Recipe r Where r.type = ?1")
    List<Recipe> findAllByType(String type);
    @Query("SELECT r FROM Recipe r Where r.type = ?1 and LOWER(r.name) LIKE LOWER(CONCAT('%', ?2, '%'))")
    List<Recipe> findAllByTypeAndName(String type, String recipeName);
    @Query("SELECT r FROM Recipe r WHERE FUNCTION('TIME_FORMAT', r.time, '%H:%i:%s') <= '01:00:00'")
    List<Recipe> findAllLessThan1();
    @Query("SELECT r FROM Recipe r WHERE r.name= ?1 and FUNCTION('TIME_FORMAT', r.time, '%H:%i:%s') <= '01:00:00'")
    List<Recipe> findAllLessThan1ByName(String recipeName);
    @Query("SELECT r FROM Recipe r WHERE FUNCTION('TIME_FORMAT', r.time, '%H:%i:%s') <= '02:00:00'")
    List<Recipe> findAllLessThan2();
    @Query("SELECT r FROM Recipe r WHERE r.name=?1 and  FUNCTION('TIME_FORMAT', r.time, '%H:%i:%s') <= '02:00:00'")
    List<Recipe> findAllLessThan2ByName(String recipeName);
    @Transactional
    @Modifying
    @Query("UPDATE Recipe r " + "SET r.nrLikes = ?1 WHERE r.id = ?2")
    int updateNrLikes( Long likes,Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Recipe r " + "SET r.nrComments = ?1 WHERE r.id = ?2")
    int updateNrComments( Long comms,Long id);
}
