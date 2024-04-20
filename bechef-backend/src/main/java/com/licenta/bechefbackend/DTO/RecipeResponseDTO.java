package com.licenta.bechefbackend.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.RecipeStep;
import com.licenta.bechefbackend.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
public class RecipeResponseDTO {

    private Long id;
    private Long userId;
    private List<RecipeStep> steps;
    private List<Ingredient> ingredients;
    private List<Like> likes ;
    private String name;
    private String description;
    private String image;
    private Long nrLikes ;
    private Long nrComments;
    private String type;
    private String time;
}
