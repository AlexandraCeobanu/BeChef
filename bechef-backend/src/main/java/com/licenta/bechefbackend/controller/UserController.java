package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entity.User;
import com.licenta.bechefbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public ResponseEntity<String> allUsers()
    {
        return new ResponseEntity<String>("Users!", HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestParam String email, @RequestParam String password)
    {
        try {
            return new ResponseEntity<User>(userService.registerUser(email, password), HttpStatus.CREATED);
        }
        catch (Exception exception){
            System.out.println("Error" + exception);
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);}

    }

}
