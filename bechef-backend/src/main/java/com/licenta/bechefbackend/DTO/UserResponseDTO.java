package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.Like;
import com.licenta.bechefbackend.entities.Recipe;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String email;
    private String userUsername;
    private Long nrLikes;
    private Long nrRecipes;
    private List<Recipe> recipes;
    private List<Like> likesGiven;
    private List<Like> likesReceived;
}
