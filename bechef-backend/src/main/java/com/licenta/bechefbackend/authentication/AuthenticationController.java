package com.licenta.bechefbackend.authentication;

import com.licenta.bechefbackend.entities.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.AuthenticationException;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/login")
public class AuthenticationController {
    @Autowired
    AuthenticationService authenticationService;
    @PostMapping
    public ResponseEntity login(@RequestBody AuthenticationRequest authRequest)
    {
        try {
            return new ResponseEntity<AuthenticationResponse>(authenticationService.login(authRequest), HttpStatus.OK);
        }
        catch (BadCredentialsException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch(IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
