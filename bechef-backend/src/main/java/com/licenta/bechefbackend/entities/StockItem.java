package com.licenta.bechefbackend.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StockItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "stockList_id"
    )
    @JsonIgnore
    private StockList stockList;

    String item;
    String quantity;

    Long idItemShoppingList;
    private Date expirationDate;
    private String status;

    public StockItem(StockList stockList, String item, String quantity, Date expirationDate)
    {
        this.stockList = stockList;
        this.item = item;
        this.quantity = quantity;
        this.expirationDate = expirationDate;
        this.status = "good";
    }

}

