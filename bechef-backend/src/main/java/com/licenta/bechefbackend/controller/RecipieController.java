package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.RecipeDTO;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.services.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipe")
public class RecipieController {

    RecipeService recipeService;
    @GetMapping
    public ResponseEntity<?> getRecipes()
    {
        try {
            return new ResponseEntity<List<Recipe>>(recipeService.getAllRecipes(), HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getRecipeById(@PathVariable Long id)
    {
        try{
             Recipe recipe = recipeService.getRecipeById(id);
             if (recipe != null)
             return new ResponseEntity<Recipe>(recipe,HttpStatus.OK);
             else
               return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Recipe Id not found");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PostMapping()
    public ResponseEntity<?> createRecipe(@RequestBody RecipeDTO recipeDTO){
        try{
            Recipe recipe = recipeService.createRecipe(recipeDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateRecipe(@PathVariable Long id, @RequestBody RecipeDTO recipeDTO)
    {
        try{
            Recipe recipe = recipeService.updateRecipe(id,recipeDTO);
            return ResponseEntity.status(HttpStatus.OK).body(recipe);
        }
        catch (IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
