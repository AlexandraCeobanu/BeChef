package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.CollectionDTO;
import com.licenta.bechefbackend.DTO.RecipeResponseDTO;
import com.licenta.bechefbackend.entities.RecipeCollection;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.CollectionRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CollectionService {

    @Autowired
    RecipeRepository recipeRepository ;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CollectionRepository collectionRepository;

    public void createCollection(CollectionDTO collectionDTO) {
        Recipe recipe = recipeRepository.findById(collectionDTO.getRecipeId()).orElse(null);
        User user = userRepository.findById(recipe.getUser().getId()).orElse(null);
        if(recipe != null && user != null)
        {
            RecipeCollection newCollection  = new RecipeCollection();
            newCollection.setName(collectionDTO.getName());
            newCollection.setUser(user);
            newCollection.getRecipes().add(recipe);
            newCollection.setRecipeIdImage(recipe.getId());
            collectionRepository.save(newCollection);
        }
    }

    public List<RecipeCollection> getCollectionsByUserId(Long userId) {
        List<RecipeCollection> collections = collectionRepository.findAllByUserId(userId);
        return collections;
    }

    public List<RecipeResponseDTO> getCollectionRecipes(Long id) {
        RecipeCollection collection = collectionRepository.findById(id).orElse(null);
        List<RecipeResponseDTO> savedRecipesDTO = new ArrayList<>();
        if(collection != null)
        {
            List<Recipe> recipes = collection.getRecipes();
            for (Recipe recipe : recipes)
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


    public void saveRecipeInCollection(Long collectionId, Long recipeId) {
        RecipeCollection collection = collectionRepository.findById(collectionId).orElse(null);
        Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
        if(collection != null && recipe !=null)
        {
                List<Recipe> recipes = collection.getRecipes();
                if(recipes.isEmpty())
                {
                    collection.setRecipeIdImage(recipeId);
                }
            collection.getRecipes().add(recipe);
            collectionRepository.save(collection);
        }
    }

    public List<RecipeCollection> deleteCollection(Long collectionId) {
        RecipeCollection collection = collectionRepository.findById(collectionId).orElse(null);
        Long userId = collection.getUser().getId();
        collectionRepository.deleteById(collectionId);
        List<RecipeCollection> collections = collectionRepository.findAllByUserId(userId);
        return collections;
    }
}
