package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;
    @GetMapping("/users")
    public ResponseEntity<?> allUsers()
    {
        List<User> userList = userService.getAllUsers();
        return  ResponseEntity.status(HttpStatus.OK).body(userList);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id)
    {
        try {
            User user = userService.getUserById(id);
            if (user != null)
                return ResponseEntity.status(HttpStatus.OK).body(user);
            else
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

}
