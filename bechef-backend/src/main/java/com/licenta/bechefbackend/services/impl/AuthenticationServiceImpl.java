package com.licenta.bechefbackend.services.impl;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import com.licenta.bechefbackend.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    public User registerUser(UserDTO userDTO){

        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setRole(Role.USER);

        userRepository.save(newUser);
        return newUser;
    }
}
