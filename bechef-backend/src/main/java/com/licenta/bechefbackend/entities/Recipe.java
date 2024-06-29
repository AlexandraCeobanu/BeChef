package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
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
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<RecipeStep> steps;
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<Ingredient> ingredients;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<Like> likes = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();


    @OneToMany(mappedBy = "recipe", cascade = CascadeType.REMOVE)
    private List<Notification> notifications = new ArrayList<>();

    @ManyToMany(mappedBy = "savedRecipes")
    @JsonIgnore
    private List<User> savedByUsers = new ArrayList<>();
    private String name;
    private String description;
    private String image;
    private Long nrLikes ;
    private Long nrComments;

    private String type;
    private String time;
    public Recipe(String name,String description, User user, List<RecipeStep> steps,String image,List<Ingredient> ingredients,String type,String time)
    {
        this.user = user;
        this.description=description;
        this.name = name;
        this.steps = steps;
        this.image = image;
        this.nrLikes = Long.valueOf(0);
        this.nrComments= Long.valueOf(0);
        this.ingredients = ingredients;
        this.time = time;
        this.type = type;
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
                ", type=" + type +
                ", time=" + String.valueOf(time) +
                '}';
    }
}
