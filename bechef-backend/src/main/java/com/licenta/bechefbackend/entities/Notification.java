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
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

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

    @ManyToOne
    @JoinColumn(name = "thread_id")
    @JsonIgnore
    private ChatThread thread;

    @ManyToOne
    @JoinColumn(name = "stockItem_id")
    @JsonIgnore
    private StockItem stockItem;

    @ManyToOne
    @JoinColumn(name = "list_id")
    @JsonIgnore
    private ShoppingList list;

    String message ;
    Boolean isRead = false;
    String type ;
    public Notification(User senderUser,User receiverUser, Recipe recipe, ChatThread thread,StockItem stockItem,ShoppingList list,String message, String type)
    {
        this.senderUser=senderUser;
        this.recipe = recipe;
        this.receiverUser = receiverUser;
        this.message=message;
        this.type = type;
        this.thread = thread;
        this.stockItem = stockItem;
        this.list = list;
    }

}
