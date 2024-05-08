package com.licenta.bechefbackend.registration.token;

import com.licenta.bechefbackend.entities.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@Entity
public class ConfirmationToken {
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(nullable = false)
    private String token;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime expiresAt;
    private LocalDateTime confirmedAt;
    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "user_id"
    )
    private User user;
    public ConfirmationToken(String token,LocalDateTime createdAt, LocalDateTime expiresAt, User user, String type)
    {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.user=user;
        this.type = type;
    }

}
