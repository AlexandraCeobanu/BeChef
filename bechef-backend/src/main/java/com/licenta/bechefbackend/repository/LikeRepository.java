package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.Recipe;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends CrudRepository<Like,Long> {
    @Query("SELECT l FROM Like l Where l.recipe.id = ?1")
    List<Like> findAllByRecipeId(Long recipeId);

    @Query("SELECT l FROM Like l Where l.likerUser.id = ?1")
    List<Like> findAllByLikerId(Long likerId);

    @Modifying
    @Transactional
    @Query("DELETE  FROM Like  Where likerUser.id = ?1 and recipe.id =?2")
    int deleteByUserAndRecipeIds(Long likerId,Long recipeId);
}
