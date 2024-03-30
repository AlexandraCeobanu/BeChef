package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.LikeDTO;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
}
