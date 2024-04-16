package com.licenta.bechefbackend.DTO;

import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class IngredientDTO {
    String name;
    String quantity;
    public IngredientDTO(){

    }
}
