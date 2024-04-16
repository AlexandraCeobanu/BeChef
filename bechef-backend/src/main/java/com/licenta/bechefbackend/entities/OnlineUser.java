package com.licenta.bechefbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class OnlineUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    Long userId ;
    String sessionId;

   public OnlineUser(Long userId, String sessionId)
   {
       this.userId = userId;
       this.sessionId = sessionId;
   }
}
