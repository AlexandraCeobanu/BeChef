package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.DTO.LikeResponseDTO;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.LikeRepository;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
        Long nrLikes = likedUser.getNrLikes() +1;
        userRepository.updateNrLikes(nrLikes,likedUser.getId());
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

    public List<Like> findByRecipeId(Long recipeId) {

        List<Like> likes = likeRepository.findAllByRecipeId(recipeId);
        return likes;
    }

    public List<LikeResponseDTO> getLikedRecipes(Long likerId) {
        List<Like> likes = likeRepository.findAllByLikerId(likerId);
        List<LikeResponseDTO> likesDTO = new ArrayList<>();
        for(Like like: likes)
        {
            LikeResponseDTO likeDTO = new LikeResponseDTO(like.getLikerUser().getId(),like.getLikedUser().getId(),like.getRecipe().getId());
            likesDTO.add(likeDTO);
        }
        return likesDTO;
    }
}
