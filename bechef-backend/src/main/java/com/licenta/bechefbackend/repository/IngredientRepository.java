package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.RecipeStep;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends CrudRepository<Ingredient,Long> {

    @Query("Select i from Ingredient i Where i.recipe.id = ?1 ")
    List<Ingredient> findAllByRecipeId(Long recipeId);

    @Query("Select i from Ingredient i where i.id =?1")
    Optional<Ingredient> findByRecipeIdAndIngredientId(Long id);

}
