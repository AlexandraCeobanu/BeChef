package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.RecipeDTO;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecipeService {
    RecipeRepository recipeRepository;
    public List<Recipe> getAllRecipes() {
        List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
        return recipes;
    }

    public Recipe getRecipeById(Long id) {

        Recipe recipe = recipeRepository.findById(id).orElse(null);
        return recipe;
    }

    public Recipe createRecipe(RecipeDTO recipeDTO) {
        try
        {
            Recipe recipe = new Recipe();
            recipe.setName(recipeDTO.getName());
            recipe.setImagePath(recipeDTO.getImagePath());
            recipe.setUserId(recipeDTO.getUserId());
            return  recipeRepository.save(recipe);
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public Recipe updateRecipe(Long id, RecipeDTO recipeDTO) {

        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe != null)
        {
            String name = recipeDTO.getName();
            String imagePath = recipeDTO.getImagePath();
            Long userId = recipeDTO.getUserId();
            return recipeRepository.updateRecipe(name,imagePath,userId,id);
        }
        else {
            throw new IllegalStateException("Recipe id not found");
        }
    }
}
