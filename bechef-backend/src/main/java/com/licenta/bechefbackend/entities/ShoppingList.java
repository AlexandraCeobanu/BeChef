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
public class ShoppingList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "shoppingList",cascade = CascadeType.REMOVE)
    private List<Item> items;

    String name;

    @OneToMany(mappedBy = "list", cascade = CascadeType.REMOVE)
    private List<Notification> notifications = new ArrayList<>();

    @ManyToMany(mappedBy = "shoppingListsColab",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> collaborators = new ArrayList<>();

    public ShoppingList(User user, List<Item> items, String name)
    {
        this.user = user;
        this.items = items;
        this.name = name;
    }

}
