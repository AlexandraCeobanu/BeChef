package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.RecipeStep;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class RecipeDTO {

    private Long userId;
    private String imagePath;
    private String name;
}
