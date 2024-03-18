package com.licenta.bechefbackend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
public class RecipeStep {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "recipe_id"
    )
    private Long recipeId;
    private String description;

    public RecipeStep(Long recipeId,String description){
        this.recipeId = recipeId;
        this.description = description;
    }

}
