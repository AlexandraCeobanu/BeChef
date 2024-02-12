package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.licenta.bechefbackend.ValidationUtil.*;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    public User registerUser(UserDTO userDTO){

        validateData(userDTO);
        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setRole(Role.USER);
        userRepository.save(newUser);
        return newUser;
    }
    public void validateData(UserDTO userDTO)
    {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent())
        {
            throw new IllegalStateException("The email is already used.");
        }
        if (!checkEmail(userDTO.getEmail()))
        {
            throw new IllegalStateException("Invalid email");
        }
        String response = checkPassword(userDTO.getPassword());

        if (!response.equals(""))
        {
            throw new IllegalStateException(response);
        }

    }
}
