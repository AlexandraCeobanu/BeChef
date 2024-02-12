package com.licenta.bechefbackend.registration;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class RegistrationController {

    @Autowired
    RegistrationService registrationService;
    @Autowired
    UserRepository userRepository;
    @GetMapping()
    public String itWorks()
    {
        return "It works";
    }
    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody UserDTO userDTO)
    {
        try {
            return new ResponseEntity<User>(registrationService.registerUser(userDTO), HttpStatus.CREATED);
        }
        catch (IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
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
