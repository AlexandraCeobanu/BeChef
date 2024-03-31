package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.CommentDTO;
import com.licenta.bechefbackend.entities.Comment;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping
    public ResponseEntity<?> postComment(@RequestBody CommentDTO comm)
    {
        try {
            commentService.postComment(comm);
            return ResponseEntity.status(HttpStatus.CREATED).body("comment added");
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
    public ResponseEntity<?> getRecipeComments(@RequestParam Long recipeId)
    {
        try {
            List<Comment> comments = commentService.findCommentsByRecipeId(recipeId);
            return ResponseEntity.status(HttpStatus.OK).body(comments);
        }
        catch (Exception e)
        {   System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");}
    }
}
