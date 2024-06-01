package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.CollectionDTO;
import com.licenta.bechefbackend.entities.Collection;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.CollectionRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            Collection newCollection  = new Collection();
            newCollection.setName(collectionDTO.getName());
            newCollection.setUser(user);
            newCollection.getRecipes().add(recipe);
            collectionRepository.save(newCollection);
        }
    }
}
