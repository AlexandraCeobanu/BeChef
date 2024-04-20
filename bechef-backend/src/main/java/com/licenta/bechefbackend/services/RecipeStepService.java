package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.RecipeStepDTO;
import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.RecipeStepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecipeStepService {

    @Autowired
    RecipeStepRepository recipeStepRepository;
    @Autowired
    RecipeRepository recipeRepository;
    public List<RecipeStep> getAllSteps(Long recipeId)
    {
        try {
            List<RecipeStep> steps = recipeStepRepository.findAllByRecipeId(recipeId);
            return steps;
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }

    }

    public RecipeStep getStepById(Long recipeId, Long id) {
        try {
            RecipeStep recipeStep = recipeStepRepository.findByRecipeIdAndStepId(id).orElse(null);
            if (recipeStep != null)
            {
                return recipeStep;
            }
            else {
                throw new IllegalStateException("Recipe Step not found");
            }
        }
        catch(Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public List<RecipeStep> createRecipeStep(Long recipeId,List<RecipeStepDTO> recipeStepDTO) {
        try {
            Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
            List<RecipeStep> steps = new ArrayList<>();
            if (recipe !=null ){
                for (RecipeStepDTO step : recipeStepDTO) {
                    if(!step.getDescription().equals("")){
                    RecipeStep recipeStep = new RecipeStep();
                    recipeStep.setDescription(step.getDescription());
                    recipeStep.setStepIndex(step.getRecipeIndex());
                    recipeStep.setRecipe(recipe);
                    steps.add(recipeStep);}
                }
            return (List<RecipeStep>) recipeStepRepository.saveAll(steps); }
            else {
                throw new IllegalStateException("Reteta nu exista");
            }
        }catch (Exception e)
        {
            throw new RuntimeException(e);
        }
    }
}
