package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.LikeRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    LikeRepository likeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RecipeRepository recipeRepository;
    public void giveLike(LikeDTO likeDTO) {

        try {
        User likerUser = userRepository.findById(likeDTO.getLikerId()).orElse(null);
        User likedUser = userRepository.findById(likeDTO.getLikedId()).orElse(null);
        Recipe recipe =  recipeRepository.findById(likeDTO.getRecipeId()).orElse(null);
        if (likerUser!=null && likedUser !=null && recipe!=null)
        {
            Like like = new Like(likerUser,likedUser,recipe);
            likeRepository.save(like);

        }
        else {
            throw new IllegalStateException("Not found");
        }
    }
    catch(Exception e)
    {
        throw new RuntimeException(e);
    }}
}
