package com.licenta.bechefbackend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private Long userId;
    @OneToMany(mappedBy = "recipeId")
    private List<Long> stepsId;
    private String imagePath;
    private String name;
    public Recipe(String name,String imagePath, Long userId, List<Long> steps)
    {
        this.imagePath = imagePath;
        this.userId = userId;
        this.name = name;
        this.stepsId = steps;
    }

}
