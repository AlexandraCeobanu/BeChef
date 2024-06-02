package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.IngredientDTO;
import com.licenta.bechefbackend.DTO.RecipeDTO;
import com.licenta.bechefbackend.DTO.RecipeResponseDTO;
import com.licenta.bechefbackend.entities.*;
import com.licenta.bechefbackend.repository.CollectionRepository;
import com.licenta.bechefbackend.repository.IngredientRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class RecipeService {
    @Autowired
    RecipeRepository recipeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    private EntityManager entityManager;

    @Autowired
    IngredientRepository ingredientRepository;
    @Autowired
    StockListService stockListService;
    @Autowired
    CollectionRepository collectionRepository;

    public List<RecipeResponseDTO> getAllRecipes() {
        List<Recipe> recipes = (List<Recipe>) recipeRepository.findAll();
        List<RecipeResponseDTO> recipesDTO = new ArrayList<>();
        for (Recipe recipe : recipes)
        {
            RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(),recipe.getUser().getId()
                    ,recipe.getSteps(),
                    recipe.getIngredients(),recipe.getLikes(),recipe.getName(),
                    recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments()
                    , recipe.getType(),recipe.getTime()
            )   ;
            recipesDTO.add(recipeDTO);
        }
        Collections.reverse(recipesDTO);
        return recipesDTO;
    }

    public RecipeResponseDTO getRecipeById(Long id) {

        Recipe recipe = recipeRepository.findById(id).orElse(null);
        RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(),recipe.getUser().getId()
                ,recipe.getSteps(),
                recipe.getIngredients(),recipe.getLikes(),recipe.getName(),
                recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments(),
                recipe.getType(), recipe.getTime()
        )   ;
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
            recipe.setTime(recipeDTO.getTime());
            recipe.setType(recipeDTO.getType());
            User user = userRepository.findById(recipeDTO.getUserId()).orElse(null);
            Long recipes = user.getNrRecipes() + 1;
            user.setNrRecipes(recipes);
            userRepository.updateNrRecipes(recipes, user.getId());
            recipe.setUser(user);

            Recipe savedRecipe = recipeRepository.save(recipe);
            RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO(savedRecipe.getId(),savedRecipe.getUser().getId()
                    ,savedRecipe.getSteps(),
                    savedRecipe.getIngredients(),savedRecipe.getLikes(),savedRecipe.getName(),
                    savedRecipe.getDescription(),savedRecipe.getImage(),savedRecipe.getNrLikes(),savedRecipe.getNrComments(),
                    savedRecipe.getType(),savedRecipe.getTime()
            )   ;
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
                        updatedRecipe.getDescription(),updatedRecipe.getImage(),updatedRecipe.getNrLikes(),
                        updatedRecipe.getNrComments(), updatedRecipe.getType(), updatedRecipe.getTime());
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
                    recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments(),
                    recipe.getType(), recipe.getTime()
            )   ;
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
                    if(!ingredient.getName().equals("") && ingredient.getQuantity() == null && !ingredient.getQuantity().equals(""))
                    {recipeIngredient.setName(ingredient.getName());

                    recipeIngredient.setQuantity(ingredient.getQuantity());
                    recipeIngredient.setRecipe(recipe);
                    ingredients.add(recipeIngredient);}
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
                    recipe.getDescription(),recipe.getImage(),recipe.getNrLikes(),recipe.getNrComments(),
                    recipe.getType(), recipe.getTime()
            )   ;
            recipesDTO.add(recipeDTO);
        }
        return recipesDTO;
    }

    public void saveRecipe(Long recipeId, Long userId) {
            User user = userRepository.findById(userId).orElse(null);
            Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
            if (user != null && recipe!=null)
            {
                user.getSavedRecipes().add(recipe);
                userRepository.save(user);
            }
    }
    public void deleteSaveRecipe(Long recipeId, Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        List<RecipeCollection> collections = collectionRepository.findAllByUserId(userId);
        if (user != null && recipe!=null)
        {
            for (RecipeCollection collection : collections)
            {
                if(collection.getRecipes().contains(recipe))
                {
                    collection.getRecipes().remove(recipe);
                    collectionRepository.save(collection);
                    break;
                }
            }
            user.getSavedRecipes().remove(recipe);
            userRepository.save(user);
        }
    }

    public List<RecipeResponseDTO> findUserSavedRecipe(Long userId) {

        User user = userRepository.findById(userId).orElse(null);
        List<RecipeResponseDTO> savedRecipesDTO = new ArrayList<>();
        if(user != null) {
            List<Recipe> savedRecipes = user.getSavedRecipes();
            for (Recipe recipe : savedRecipes)
            {
                RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO(
                        recipe.getId(),recipe.getUser().getId(), recipe.getSteps(),recipe.getIngredients(),
                        recipe.getLikes(),recipe.getName(), recipe.getDescription(),
                        recipe.getImage(),
                        recipe.getNrLikes(),recipe.getNrComments(),
                        recipe.getType(), recipe.getTime()
                );
                savedRecipesDTO.add(recipeResponseDTO);
            }
        }
        return savedRecipesDTO;
    }

    public List<RecipeResponseDTO> getRecipesByFilter(int filter,Long userId, String recipeName) {


        List<Recipe> recipes = new ArrayList<>();
        if (filter == 2)
        {
             if(recipeName.equals(""))
             recipes = recipeRepository.findAllByType("Breakfast");
             else{
                 recipes = recipeRepository.findAllByTypeAndName("Breakfast",recipeName);
             }
        }
        if (filter == 3) {
            if(recipeName.equals(""))
            recipes = recipeRepository.findAllByType("Lunch");
            else{
                recipes = recipeRepository.findAllByTypeAndName("Lunch",recipeName);
            }
        }

        if (filter == 4){
            if(recipeName.equals(""))
             recipes = recipeRepository.findAllByName("Dinner");
            else {
                recipes = recipeRepository.findAllByTypeAndName("Dinner",recipeName);
            }
        }
        if (filter == 5){
            if(recipeName.equals(""))
             recipes = recipeRepository.findAllByName("Dessert");
            else {
                recipes = recipeRepository.findAllByTypeAndName("Dessert",recipeName);
            }
        }

        if (filter == 6)
            {
                if(recipeName.equals(""))
                recipes = recipeRepository.findAllLessThan1();
                else
                {
                    recipes = recipeRepository.findAllLessThan1ByName(recipeName);
                }
            }
            if (filter == 7) {
                if(recipeName.equals(""))
                recipes = recipeRepository.findAllLessThan2();
                else
                {
                    recipes = recipeRepository.findAllLessThan2ByName(recipeName);
                }
            }
        if (filter == 8){
            List<Recipe> allRecipes = new ArrayList<>();
            if(recipeName.equals("")){
            allRecipes = (List<Recipe>) recipeRepository.findAll();}
            else{
                allRecipes =  recipeRepository.findAllByName(recipeName);
            }
            StockList stockList = stockListService.getStockList(userId);

            List<String>  allItemsStock = stockListService.getItemsNames(stockList.getId());

            for(Recipe recipe : allRecipes )
            {
                List<String> ingredientsName = ingredientRepository.findAllIngredientsNames(recipe.getId());
                boolean allPresent = allItemsStock.containsAll(ingredientsName);

                if (allPresent) {
                    recipes.add(recipe);
                }
            }
        }
            List<RecipeResponseDTO> recipesDTO = new ArrayList<>();
            for (Recipe recipe : recipes) {
                RecipeResponseDTO recipeDTO = new RecipeResponseDTO(recipe.getId(), recipe.getUser().getId()
                        , recipe.getSteps(),
                        recipe.getIngredients(), recipe.getLikes(), recipe.getName(),
                        recipe.getDescription(), recipe.getImage(), recipe.getNrLikes(), recipe.getNrComments(),
                        recipe.getType(), recipe.getTime()
                );
                recipesDTO.add(recipeDTO);
            }
            return recipesDTO;
        }


    public void deleteRecipe(Long recipeId) {

        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        List<User> users = recipe.getSavedByUsers();
        for(User user: users)
        {
            user.getSavedRecipes().remove(recipe);
            List<RecipeCollection> collections = collectionRepository.findAllByUserId(user.getId());
            for (RecipeCollection collection : collections)
            {
                if(collection.getRecipes().contains(recipe))
                {
                    collection.getRecipes().remove(recipe);
                    collectionRepository.save(collection);
                    break;
                }
            }
            userRepository.save(user);
        }
        recipeRepository.deleteById(recipeId);
    }
}
