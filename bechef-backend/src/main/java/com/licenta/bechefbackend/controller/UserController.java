package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entity.User;
import com.licenta.bechefbackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            if (!checkPasswords(password,repeatedPassword))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The passwords don't match");
            }
            if (!checkEmail(email))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
            }
            if (checkPassword(password)!=null)
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
            }

            return new ResponseEntity<User>(userService.registerUser(email, password,repeatedPassword), HttpStatus.CREATED);
        }
        catch (Exception exception){
            System.out.println("Error" + exception);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);}

    }

}
