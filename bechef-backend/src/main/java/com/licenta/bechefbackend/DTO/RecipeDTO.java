package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.RecipeStep;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
public class RecipeDTO {

    private Long userId;
    private String name;
    private String description;
    private String time;
    private  String type;
}
