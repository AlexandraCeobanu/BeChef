package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.IngredientDTO;
import com.licenta.bechefbackend.DTO.RecipeDTO;
import com.licenta.bechefbackend.DTO.RecipeStepDTO;
import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.IngredientRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import io.swagger.models.auth.In;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecipeService {
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    IngredientRepository ingredientRepository;
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
            recipe.setDescription(recipeDTO.getDescription());
            User user = userRepository.findById(recipeDTO.getUserId()).orElse(null);
            Long recipes = user.getNrRecipes() + 1;
            user.setNrRecipes(recipes);
            userRepository.updateNrRecipes(recipes, user.getId());
            recipe.setUser(user);
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
            String description = recipeDTO.getDescription();
            Long userId = recipeDTO.getUserId();
            recipeRepository.updateRecipe(name,description,id);
            return recipeRepository.findById(id).orElse(null);
        }
        else {
            throw new IllegalStateException("Recipe id not found");
        }
    }

    public List<Recipe> getRecipesByUserId(Long id) {
        List<Recipe> recipes = recipeRepository.findAllByUserId(id);
        return recipes;
    }

    public List<Ingredient> addIngredients(Long recipeId,List<IngredientDTO> ingredientsDTO) {
        try {
            Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
            List<Ingredient> ingredients = new ArrayList<>();
            if (recipe !=null ){
                for (IngredientDTO ingredient : ingredientsDTO) {
                    Ingredient recipeIngredient = new Ingredient();
                    recipeIngredient.setName(ingredient.getName());
                    recipeIngredient.setRecipe(recipe);
                    ingredients.add(recipeIngredient);
                }
                return (List<Ingredient>) ingredientRepository.saveAll(ingredients); }
            else {
                throw new IllegalStateException("Reteta nu exista");
            }
        }catch (Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public List<Ingredient> getIngredients(Long recipeId) {
        try {
            List<Ingredient> ingredients = ingredientRepository.findAllByRecipeId(recipeId);
            return ingredients;
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public Ingredient getIngredientById(Long recipeId, Long id) {
        try {
            Ingredient ingredient = ingredientRepository.findByRecipeIdAndIngredientId(id).orElse(null);
            if (ingredient != null)
            {
                return ingredient;
            }
            else {
                throw new IllegalStateException("Recipe Ingredient not found");
            }
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }
}
