package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.authentication.AuthenticationRequest;
import com.licenta.bechefbackend.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ForgotPasswordController {
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
    @PostMapping(path = "/confirmChangedPassword")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(passwordService.confirmToken(token));}

        catch (IllegalStateException e){
            return  ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

}
    @GetMapping(path = "/changePassword/resendLink")
    public ResponseEntity<String> resendLink(@RequestParam("email") String email) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(passwordService.resendLink(email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
