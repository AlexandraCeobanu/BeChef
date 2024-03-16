package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.authentication.AuthenticationRequest;
import com.licenta.bechefbackend.email.EmailSender;
import com.licenta.bechefbackend.registration.token.ConfirmationTokenService;
import com.licenta.bechefbackend.repository.UserRepository;
import com.licenta.bechefbackend.services.JWTService;
import com.licenta.bechefbackend.services.PasswordService;
import com.licenta.bechefbackend.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ForgotPassword {
    @Autowired
    PasswordService passwordService;
   @PostMapping(path = "/changePassword")
    public ResponseEntity changePassword(@RequestBody AuthenticationRequest authenticationRequest)
   {
       try {
           return new ResponseEntity<String>(passwordService.changePassword(authenticationRequest), HttpStatus.OK);
       }
       catch(IllegalStateException e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
       }
   }
    @GetMapping(path = "/confirmChangePassword")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(passwordService.confirmToken(token));}

        catch (IllegalStateException e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

}}
