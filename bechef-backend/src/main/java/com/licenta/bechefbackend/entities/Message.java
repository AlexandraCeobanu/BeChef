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
public class Message {
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String message;
    @ManyToOne
    @JoinColumn(name = "sender_user_id")
    @JsonIgnore
    private User senderUser;

    @ManyToOne
    @JoinColumn(name = "thread_id")
    @JsonIgnore
    private ChatThread thread ;
    public Message(String message, User user, ChatThread thread)
    {
        this.message = message;
        this.senderUser = user;
        this.thread = thread;
    }

}
