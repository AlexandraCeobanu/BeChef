package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.CollectionDTO;
import com.licenta.bechefbackend.DTO.RecipeResponseDTO;
import com.licenta.bechefbackend.services.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/v1/collections")
public class CollectionController {
    @Autowired
    CollectionService collectionService;

    @PostMapping
    public ResponseEntity<?> addCollection(@RequestBody CollectionDTO collectionDTO)
    {
        try {
            collectionService.createCollection(collectionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("");
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping
    public ResponseEntity<?> getCollectionsByUserId(@RequestParam Long userId)
    {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(collectionService.getCollectionsByUserId(userId));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/{id}/recipes")
    public ResponseEntity<?> getCollectionRecipes(@PathVariable Long id)
    {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(collectionService.getCollectionRecipes(id));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @PostMapping("/{collectionId}/recipes")
    public ResponseEntity<?> saveRecipeInCollection(@PathVariable Long collectionId, @RequestParam Long recipeId)
    {
        try {
            collectionService.saveRecipeInCollection(collectionId,recipeId);
            return ResponseEntity.status(HttpStatus.CREATED).body("");
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @DeleteMapping("/{collectionId}")
    public ResponseEntity<?> deleteCollection(@PathVariable Long collectionId)
    {
        try {

            return ResponseEntity.status(HttpStatus.CREATED).body(collectionService.deleteCollection(collectionId));
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
