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
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "shoppingList_id"
    )
    @JsonIgnore
    private ShoppingList shoppingList;


    String item;
    String quantity;

    Boolean checked = false;
    public Item(ShoppingList shoppingList, String item,String quantity)
    {
        this.shoppingList = shoppingList;
        this.item = item;
        this.quantity = quantity;

    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +

                ", item='" + item + '\'' +
                ", quantity='" + quantity + '\'' +
                ", checked=" + checked +
                '}';
    }
}
