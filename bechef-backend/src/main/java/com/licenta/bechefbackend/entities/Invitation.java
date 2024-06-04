package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_user_id")
    @JsonIgnore
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiver_user_id")
    @JsonIgnore
    private User receiver;
    @ManyToOne()
    @JoinColumn(name = "list_id")
    @JsonIgnore
    private ShoppingList list;
    private String status;

    public Invitation(User sender,User receiver, ShoppingList shoppingList, String status)
    {
        this.sender=sender;
        this.receiver = receiver;
        this.list = shoppingList;
        this.status = status;
    }
}
