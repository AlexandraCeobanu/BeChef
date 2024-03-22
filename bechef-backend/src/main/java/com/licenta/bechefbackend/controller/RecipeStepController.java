package com.licenta.bechefbackend.controller;
import com.licenta.bechefbackend.DTO.RecipeStepDTO;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.services.RecipeStepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/recipes")
public class RecipeStepController {
    @Autowired
    RecipeStepService recipeStepService;
    @GetMapping("/{recipeId}/steps")
    public ResponseEntity<?> getRecipeSteps(@PathVariable Long recipeId)
    {
        try{
            List<RecipeStep> steps = recipeStepService.getAllSteps(recipeId);
            return ResponseEntity.status(HttpStatus.OK).body(steps);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/{recipeId}/recipeSteps/{id}")
    public ResponseEntity<?> getRecipeStepById(@PathVariable Long recipeId, @PathVariable Long id)
    {
        try{
            RecipeStep recipeStep = recipeStepService.getStepById(recipeId,id);
            return ResponseEntity.status(HttpStatus.OK).body(recipeStep);
        }catch(IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PostMapping("/{recipeId}/recipeSteps")
    public ResponseEntity<?> createRecipeStep(@PathVariable Long recipeId , @RequestBody List<RecipeStepDTO> recipeStepDTO)
    {
        try{
        List<RecipeStep> recipeStep = recipeStepService.createRecipeStep(recipeId,recipeStepDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(recipeStep);
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


}
