package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.CollectionDTO;
import com.licenta.bechefbackend.DTO.RecipeResponseDTO;
import com.licenta.bechefbackend.services.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/v1/collections")
public class CollectionController {
    @Autowired
    CollectionService collectionService;

    @PostMapping
    public ResponseEntity<?> addCollection(@RequestBody CollectionDTO collectionDTO)
    {
        try {
            collectionService.createCollection(collectionDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body("");
        }
        catch (Exception e)
        {
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
