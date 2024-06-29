package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String comm;
    @ManyToOne
    @JoinColumn(name = "sender_user_id")
    @JsonIgnore
    private User senderUser;
    @ManyToOne
    @JoinColumn(name = "receiver_user_id")
    @JsonIgnore
    private User receiverUser;
    @ManyToOne()
    @JoinColumn(name = "recipe_id")
    @JsonIgnore
    private Recipe recipe;

    public Comment(String comm,User senderUser,User receiverUser, Recipe recipe)
    {
        this.comm = comm;
        this.senderUser = senderUser;
        this.receiverUser = receiverUser;
        this.recipe = recipe;
    }

}
