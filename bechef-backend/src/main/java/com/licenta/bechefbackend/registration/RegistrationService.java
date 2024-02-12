package com.licenta.bechefbackend.registration;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.registration.token.ConfirmationToken;
import com.licenta.bechefbackend.registration.token.ConfirmationTokenService;
import com.licenta.bechefbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.licenta.bechefbackend.ValidationUtil.*;

@Service
@RequiredArgsConstructor
public class RegistrationService {
    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    public User registerUser(UserDTO userDTO){

        validateData(userDTO);
        User newUser = new User();
        newUser.setUsername(userDTO.getUsername());
        newUser.setEmail(userDTO.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        newUser.setRole(Role.USER);
        userRepository.save(newUser);
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(token, LocalDateTime.now() , LocalDateTime.now().plusMinutes(15), newUser);
        confirmationTokenService.saveConfirmationToken(confirmationToken);
        return newUser;
    }
    public void validateData(UserDTO userDTO)
    {
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent())
        {
            throw new IllegalStateException("The email is already used.");
        }
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent())
        {
            throw new IllegalStateException("The username already used.");
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
