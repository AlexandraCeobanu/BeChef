package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.models.auth.In;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "recipe_id"
    )
    @JsonIgnore
    private Recipe recipe;
    String name;
    String quantity;
    public Ingredient(Recipe recipe, String name,String quantity){
        this.recipe=recipe;
        this.name=name;
        this.quantity = quantity;
    }
}
