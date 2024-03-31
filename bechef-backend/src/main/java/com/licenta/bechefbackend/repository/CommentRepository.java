package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Comment;
import com.licenta.bechefbackend.entities.Like;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends CrudRepository<Comment,Long> {
    @Query("SELECT c FROM Comment c Where c.recipe.id = ?1")
    List<Comment> findAllByRecipeId(Long recipeId);
}
