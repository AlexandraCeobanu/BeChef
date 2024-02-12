package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.services.AuthenticationService;
import com.licenta.bechefbackend.services.UserService;
import com.licenta.bechefbackend.services.UserServiceInterface;
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
    @Autowired
    private AuthenticationService authenticationService;
    @GetMapping("/users")
    public ResponseEntity<String> allUsers()
    {
        return new ResponseEntity<String>("Users!", HttpStatus.OK);
    }
    @GetMapping("/register")
    public String itWorks()
    {
        return "It works";
    }
    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody UserDTO userDTO)
    {
        try {

            if (isEmailUsed(userDTO.getEmail(),userService))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The email is already used.");
            }
            if (!checkEmail(userDTO.getEmail()))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
            }
            String response = checkPassword(userDTO.getPassword());
            System.out.println(response);
            if (!response.equals(""))
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            return new ResponseEntity<User>(authenticationService.registerUser(userDTO), HttpStatus.CREATED);
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
