package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entity.User;
import com.licenta.bechefbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import static com.licenta.bechefbackend.ValidationUtil.*;

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
    public ResponseEntity registerUser(@RequestParam String email, @RequestParam String password, @RequestParam String repeatedPassword)
    {
        try {

            if (isEmailUsed(email,userService))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The email is already used.");
            }
            if (!checkPasswords(password,password))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The passwords don't match");
            }
            if (!checkEmail(email))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
            }
            String response = checkPassword(password);
            System.out.println(response);
            if (!response.equals(""))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            return new ResponseEntity<User>(userService.registerUser(email, password,repeatedPassword), HttpStatus.CREATED);
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid special character");
        }
        catch (Exception e){
            System.out.println("Error" + e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);}

    }

}
