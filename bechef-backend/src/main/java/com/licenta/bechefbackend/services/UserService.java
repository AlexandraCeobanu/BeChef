package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";


    public Optional<User> findUserByEmail(String email)
    {
        Optional<User> user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                      .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG,email)));
    }
    public int enableUser(String email)
    {
        return userRepository.enableUser(email);
    }
    public void changePassword(String email,String password)
    {
        userRepository.changePassword(password,email);
    }

    public List<User> getAllUsers() {

        List<User> userList = (List<User>) userRepository.findAll();
        return userList;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
//    @Override
//    public UserDetailsService userDetailsService(){
//        return new UserDetailsService() {
//            @Override
//            public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//                return userRepository.findByEmail(email)
//                        .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG,email)));
//            }
//        };
//    }
}
