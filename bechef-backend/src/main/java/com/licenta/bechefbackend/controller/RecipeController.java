package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.IngredientDTO;
import com.licenta.bechefbackend.DTO.RecipeDTO;
import com.licenta.bechefbackend.DTO.RecipeResponseDTO;
import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.services.RecipeService;
import io.swagger.models.auth.In;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recipes")
public class RecipeController {
    @Autowired
    RecipeService recipeService;
    @GetMapping("/all")
    public ResponseEntity<?> getRecipes()
    {
        try {
            return new ResponseEntity<List<RecipeResponseDTO>>(recipeService.getAllRecipes(), HttpStatus.OK);
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
             RecipeResponseDTO recipe = recipeService.getRecipeById(id);
             if (recipe != null)
             return new ResponseEntity<RecipeResponseDTO>(recipe,HttpStatus.OK);
             else
               return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe  not found");
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PostMapping()
    public ResponseEntity<?> createRecipe(@RequestBody RecipeDTO recipeDTO){
        try{
            RecipeResponseDTO recipe = recipeService.createRecipe(recipeDTO);
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
            RecipeResponseDTO recipe = recipeService.updateRecipe(id,recipeDTO);
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

    @GetMapping
    public ResponseEntity<?> getRecipesByUserId(@RequestParam Long id)
    {
        try {
            return new ResponseEntity<List<RecipeResponseDTO>>(recipeService.getRecipesByUserId(id), HttpStatus.OK);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }


    @GetMapping("/byname")
    public ResponseEntity<?> getRecipesByName(@RequestParam String name)
    {
        try {
            return new ResponseEntity<List<RecipeResponseDTO>>(recipeService.getRecipesByName(name), HttpStatus.OK);
        }
        catch (Exception e)
        {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PostMapping("/{recipeId}/ingredients")
    public ResponseEntity<?> addIngredients(@PathVariable Long recipeId, @RequestBody List<IngredientDTO> ingredientsDTO)
    {
        try{
            List<Ingredient> ingredients = recipeService.addIngredients(recipeId,ingredientsDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(ingredients);
        }
        catch (IllegalStateException e){
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("");
        }
        catch (RuntimeException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/{recipeId}/ingredients")
    public ResponseEntity<?> getIngredients(@PathVariable Long recipeId)
    {
        try{
            List<Ingredient> ingredients = recipeService.getIngredients(recipeId);
            return ResponseEntity.status(HttpStatus.OK).body(ingredients);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/{recipeId}/ingredients/{id}")
    public ResponseEntity<?> getIngredientById(@PathVariable Long recipeId, @PathVariable Long id)
    {
        try{
            Ingredient ingredient = recipeService.getIngredientById(recipeId,id);
            return ResponseEntity.status(HttpStatus.OK).body(ingredient);
        }catch(IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
