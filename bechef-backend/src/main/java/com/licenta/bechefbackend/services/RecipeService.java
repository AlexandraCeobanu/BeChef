package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.IngredientDTO;
import com.licenta.bechefbackend.DTO.RecipeDTO;
import com.licenta.bechefbackend.DTO.RecipeResponseDTO;
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
    public List<RecipeResponseDTO> getAllRecipes() {
        List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
        List<RecipeResponseDTO> recipesDTO = new ArrayList<>();
        for (Recipe recipe : recipes)
        {
            RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(),recipe.getUser().getId()
                    ,recipe.getSteps(),
                    recipe.getIngredients(),recipe.getLikes(),recipe.getName(),
                    recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments())   ;
            recipesDTO.add(recipeDTO);
        }
        return recipesDTO;
    }

    public RecipeResponseDTO getRecipeById(Long id) {

        Recipe recipe = recipeRepository.findById(id).orElse(null);
        RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(),recipe.getUser().getId()
                ,recipe.getSteps(),
                recipe.getIngredients(),recipe.getLikes(),recipe.getName(),
                recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments())   ;
        return recipeDTO;
    }

    public RecipeResponseDTO createRecipe(RecipeDTO recipeDTO) {
        try
        {
            Recipe recipe = new Recipe();
            recipe.setName(recipeDTO.getName());
            recipe.setDescription(recipeDTO.getDescription());
            recipe.setNrLikes(0L);
            recipe.setNrComments(0L);
            User user = userRepository.findById(recipeDTO.getUserId()).orElse(null);
            Long recipes = user.getNrRecipes() + 1;
            user.setNrRecipes(recipes);
            userRepository.updateNrRecipes(recipes, user.getId());
            recipe.setUser(user);

            Recipe savedRecipe = recipeRepository.save(recipe);
            RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO(savedRecipe.getId(),savedRecipe.getUser().getId()
                    ,savedRecipe.getSteps(),
                    savedRecipe.getIngredients(),savedRecipe.getLikes(),savedRecipe.getName(),
                    savedRecipe.getDescription(),savedRecipe.getImage(),savedRecipe.getNrLikes(),savedRecipe.getNrComments())   ;
            return  recipeResponseDTO;
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public RecipeResponseDTO updateRecipe(Long id, RecipeDTO recipeDTO) {

        Recipe recipe = recipeRepository.findById(id).orElse(null);
        if (recipe != null)
        {
            String name = recipeDTO.getName();
            String description = recipeDTO.getDescription();
            Long userId = recipeDTO.getUserId();
            recipeRepository.updateRecipe(name,description,id);
            Recipe updatedRecipe = recipeRepository.findById(id).orElse(null);
            if (updatedRecipe == null)
                return null;
            else {
                RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO(updatedRecipe.getId(),updatedRecipe.getUser().getId()
                        ,updatedRecipe.getSteps(),
                        updatedRecipe.getIngredients(),updatedRecipe.getLikes(),updatedRecipe.getName(),
                        updatedRecipe.getDescription(),updatedRecipe.getImage(),updatedRecipe.getNrLikes(),updatedRecipe.getNrComments());
                return recipeResponseDTO;
            }
        }
        else {
            throw new IllegalStateException("Recipe id not found");
        }
    }

    public List<RecipeResponseDTO> getRecipesByUserId(Long id) {
        List<Recipe> recipes = recipeRepository.findAllByUserId(id);
        List<RecipeResponseDTO> recipesDTO = new ArrayList<>();
        for (Recipe recipe : recipes)
        {
            RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(),recipe.getUser().getId()
                    ,recipe.getSteps(),
                    recipe.getIngredients(),recipe.getLikes(),recipe.getName(),
                    recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments())   ;
            recipesDTO.add(recipeDTO);
        }
        return recipesDTO;
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

    public List<RecipeResponseDTO> getRecipesByName(String name) throws Exception {
        List<Recipe> recipes = recipeRepository.findAllByName(name);
        List<RecipeResponseDTO> recipesDTO = new ArrayList<>();
        for (Recipe recipe : recipes)
        {
            RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(),recipe.getUser().getId()
                    ,recipe.getSteps(),
                    recipe.getIngredients(),recipe.getLikes(),recipe.getName(),
                    recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments())   ;
            recipesDTO.add(recipeDTO);
        }
        return recipesDTO;
    }
}
