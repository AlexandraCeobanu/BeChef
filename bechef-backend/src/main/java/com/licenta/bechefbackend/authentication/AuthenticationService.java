package com.licenta.bechefbackend.authentication;

import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import com.licenta.bechefbackend.services.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    /*public User login(AuthenticationRequest authenticationRequest)
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
    }*/
    public AuthenticationResponse login(AuthenticationRequest authenticationRequest)
    {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getEmail(),
                            authenticationRequest.getPassword()
                    )
            );
        }catch (BadCredentialsException e) {
            System.out.println("Incorrect email or password: " + e.getMessage());
            throw new BadCredentialsException("Incorrect email or password.") {
            };}

        catch (AuthenticationException e) {
            System.out.println("Failed Authentication: " + e.getMessage());
            throw new RuntimeException("Failed Authentication");
        }
        var user = userRepository.findByEmail(authenticationRequest.getEmail())
                .orElseThrow(() -> new IllegalStateException("Incorrect email"));

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
