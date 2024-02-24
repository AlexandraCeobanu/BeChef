package com.licenta.bechefbackend.authentication;

import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public User login(AuthenticationRequest authenticationRequest)
    {
        User user = userRepository.findByEmail(authenticationRequest.getEmail()).orElse(null);
        if(user!=null) {


            if (passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
                return user;
            }
            else
            {
                throw new IllegalStateException("Incorrect password");
            }
        }
        else
        {
            throw new IllegalStateException("Incorrect email");
        }
    }
}
