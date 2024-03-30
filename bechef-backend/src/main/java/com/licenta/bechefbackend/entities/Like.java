package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "liker_user_id")
    @JsonIgnore
    private User likerUser;
    @ManyToOne
    @JoinColumn(name = "liked_user_id")
    @JsonIgnore
    private User likedUser;
    @ManyToOne
    @JoinColumn(name = "recipe_id")
    @JsonIgnore
    private Recipe recipe;

    public Like(User likerUser,User likedUser, Recipe recipe)
    {
        this.likedUser = likedUser;
        this.likerUser = likerUser;
        this.recipe = recipe;
    }

}
