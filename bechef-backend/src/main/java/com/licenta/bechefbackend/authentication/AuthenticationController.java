package com.licenta.bechefbackend.authentication;

import com.licenta.bechefbackend.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/login")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;
    @PostMapping
    public ResponseEntity login(@RequestBody AuthenticationRequest authRequest)
    {
        try {
            return new ResponseEntity<User>(authenticationService.login(authRequest), HttpStatus.OK);
        }catch(IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
