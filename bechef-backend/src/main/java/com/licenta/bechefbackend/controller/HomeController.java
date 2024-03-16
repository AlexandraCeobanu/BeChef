package com.licenta.bechefbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class HomeController {
    @GetMapping("/api/v1/home")
    public ResponseEntity<String> home()
    {
        return ResponseEntity.ok("HOME");
    }
}
