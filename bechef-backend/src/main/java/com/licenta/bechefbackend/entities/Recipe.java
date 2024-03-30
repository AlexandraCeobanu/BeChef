package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    @OneToMany(mappedBy = "recipe")
    private List<RecipeStep> steps;
    @OneToMany(mappedBy = "recipe")
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe")
    private List<Like> likes = new ArrayList<>();
    private String name;
    private String description;
    private String image;
    private Long nrLikes ;
    private Long nrComments;
    public Recipe(String name,String description, User user, List<RecipeStep> steps,String image,List<Ingredient> ingredients)
    {
        this.user = user;
        this.description=description;
        this.name = name;
        this.steps = steps;
        this.image = image;
        this.nrLikes = Long.valueOf(0);
        this.nrComments= Long.valueOf(0);
        this.ingredients = ingredients;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", user=" + user +
                ", steps=" + steps +
                ", ingredients=" + ingredients +
                ", likes=" + likes +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", image='" + image + '\'' +
                ", nrLikes=" + nrLikes +
                ", nrComments=" + nrComments +
                '}';
    }
}
