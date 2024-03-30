package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.DTO.LikeResponseDTO;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/likes")
public class LikeController {
    @Autowired
    LikeService likeService;
    @PostMapping
    public ResponseEntity<?> giveLike(@RequestBody LikeDTO like)
    {
        try {
            likeService.giveLike(like);
            return ResponseEntity.status(HttpStatus.CREATED).body("Liked");
        }
        catch (IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeLike(@RequestParam Long userId,@RequestParam Long recipeId)
    {
        try {
            likeService.removeLike(userId,recipeId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
        }
        catch (IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping()
    public ResponseEntity<?> getRecipeLikes(@RequestParam Long recipeId)
    {
        try {
            List<Like> likes = likeService.findByRecipeId(recipeId);
            return ResponseEntity.status(HttpStatus.OK).body(likes);
        }
        catch (Exception e)
        {   System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");}
    }
    @GetMapping("/likerUser/{userId}")
    public ResponseEntity<?> getLikedRecipes(@PathVariable Long userId)
    {
        try {
            List<LikeResponseDTO> likes = likeService.getLikedRecipes(userId);
            return ResponseEntity.status(HttpStatus.OK).body(likes);
        }
        catch (Exception e)
        {   System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");}
    }
}
