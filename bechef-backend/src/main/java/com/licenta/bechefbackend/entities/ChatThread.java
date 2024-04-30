package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatThread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "initiator_id")
    @JsonIgnore
    private User initiatorUser;

    @OneToMany(mappedBy = "thread")
    private List<Message> messageList = new ArrayList<>();

    private String topic ;
    @ManyToMany(mappedBy = "subscribedThreads")
    @JsonIgnore
    private List<User> subscribedByUsers = new ArrayList<>();

    public ChatThread(String topic, User user)
    {
        this.topic = topic;
        this.initiatorUser = user;
    }

}
