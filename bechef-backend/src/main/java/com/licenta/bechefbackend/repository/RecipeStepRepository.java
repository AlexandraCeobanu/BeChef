package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.RecipeStep;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeStepRepository extends CrudRepository<RecipeStep,Long> {

    @Query("Select rs from RecipeStep rs Where rs.recipe.id = ?1 ")
    List<RecipeStep> findAllByRecipeId(Long recipeId);

    @Query("Select rs from RecipeStep rs where rs.id =?1")
    Optional<RecipeStep> findByRecipeIdAndStepId(Long id);

}
