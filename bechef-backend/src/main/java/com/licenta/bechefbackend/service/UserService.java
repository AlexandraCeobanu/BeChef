package com.licenta.bechefbackend.service;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.UserServiceInterface;
import com.licenta.bechefbackend.entity.User;
import com.licenta.bechefbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserServiceInterface {
    @Autowired
    private UserRepository userRepository;
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";
    public User registerUser(String email, String password, String repeatedPassword){

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(password);
        userRepository.save(newUser);
        return newUser;
    }
    public Optional<User> findUserByEmail(String email)
    {
        Optional<User> user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public UserDetailsService userDetailsService(){
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                return userRepository.findByEmail(email)
                        .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG,email)));
            }
        };
    }
}
