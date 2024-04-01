package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.services.ImageUploadService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.net.http.HttpResponse;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/upload")
public class ImageUploadController {
    @Autowired
    ImageUploadService imageUploadService;
    @PostMapping("/profileImage")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("username") String username,@RequestBody MultipartFile file)
    {
        try {
        String response = imageUploadService.uploadProfilePhoto(file,username);
        return new ResponseEntity<String>(response, HttpStatus.OK);
        }
        catch (RuntimeException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }

    }
    @GetMapping("/profileImage/{id}")
    public ResponseEntity<?> findImage(@PathVariable Long id) throws IOException {
        try{
        byte[] imageURL = imageUploadService.getImage(id);
            if(imageURL!=null)
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageURL);
            else
               return ResponseEntity.ok().body("");
        }
        catch (Exception e){
            System.out.println(e);
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }

    }
    @DeleteMapping("/deleteImages")
    public ResponseEntity<String> deleteAllImages()
    {
        try {
            imageUploadService.deleteAllImage();
            return ResponseEntity.status(HttpStatus.OK).body("deleted");
        }
        catch (RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }

    @PostMapping("/recipeImage")
    public ResponseEntity<String> uploadRecipeImage(@RequestParam("recipeId") Long recipeId,@RequestBody MultipartFile file)
    {
        try {
            String response = imageUploadService.uploadImagePhoto(file,recipeId);
            return new ResponseEntity<String>(response, HttpStatus.OK);
        }
        catch (RuntimeException e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping("/recipeImage/{id}")
    public ResponseEntity<?> findRecipeImage(@PathVariable Long id) throws IOException {
        try{
            byte[] imageURL = imageUploadService.getRecipePhoto(id);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageURL);
        }
        catch (Exception e){
        }
        return (ResponseEntity<byte[]>) ResponseEntity.ok().contentType(MediaType.valueOf("image/jpeg"));
    }

}
