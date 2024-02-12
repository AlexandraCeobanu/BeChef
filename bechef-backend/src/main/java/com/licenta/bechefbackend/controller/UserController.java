package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.services.UserService;
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
}
