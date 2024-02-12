package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.entities.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserServiceInterface {
    UserDetailsService userDetailsService();

    Optional<User> findUserByEmail(String email);
}
