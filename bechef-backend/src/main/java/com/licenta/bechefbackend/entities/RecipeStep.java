package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @ManyToOne()
    @JoinColumn(
            nullable = false,
            name = "recipe_id"
    )
    @JsonIgnore
    private Recipe recipe;
    private String description;
    private Long stepIndex;
    public RecipeStep(Recipe recipe,String description,Long stepIndex){
        this.recipe = recipe;
        this.description = description;
        this.stepIndex = stepIndex;
    }

}
