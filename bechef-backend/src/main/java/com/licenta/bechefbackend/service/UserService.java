package com.licenta.bechefbackend.service;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entity.User;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public User registerUser(String email, String password, String repeatedPassword){

        User newUser = new User();
        newUser.setEmail(email);
        newUser.setPassword(password);
        userRepository.save(newUser);
        return newUser;
    }
    public User findUserByEmail(String email)
    {
        User user = userRepository.findByEmail(email);
        return user;
    }

}
