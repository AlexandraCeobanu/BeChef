package com.licenta.bechefbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String email;
    private String password;
    private String userUsername;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Boolean enabled = true;
    private String profilePicture ;
    private Long nrLikes;
    private Long nrRecipes;
    @OneToMany(mappedBy = "user")
    private List<Recipe> recipes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "user_savedRecipe",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    private List<Recipe> savedRecipes = new ArrayList<>();

    @OneToMany(mappedBy = "likerUser")
    private List<Like> likesGiven = new ArrayList<>();

    @OneToMany(mappedBy = "likedUser")
    private List<Like> likesReceived = new ArrayList<>();

    @OneToMany(mappedBy = "senderUser")
    private List<Notification> createdNotifications = new ArrayList<>();

    @OneToMany(mappedBy = "receiverUser")
    private List<Notification> userNotifications = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private ShoppingList shoppingList;

    @OneToOne(mappedBy = "user")
    private StockList stockList;

    @ManyToMany
    @JoinTable(
            name = "user_subscribedThreads",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chatThread_id")
    )
    private List<ChatThread> subscribedThreads = new ArrayList<>();

    public User(String username,String email, String password, Role role)
    {
        this.userUsername = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.nrLikes = Long.valueOf(0);
        this.nrRecipes = Long.valueOf(0);
        this.profilePicture="";
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
