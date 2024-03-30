package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.Ingredient;
import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.RecipeStep;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LikeResponseDTO {
    private Long likerId;
    private Long likedId;
    private Long recipeId;

}
