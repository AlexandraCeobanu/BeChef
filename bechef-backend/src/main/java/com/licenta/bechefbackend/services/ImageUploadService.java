package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.entities.Recipe;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.RecipeRepository;
import com.licenta.bechefbackend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ImageUploadService {
    UserRepository userRepository ;
    RecipeRepository recipeRepository;
    public String uploadProfilePhoto(MultipartFile file,String username){
        if (file.isEmpty()) {
            return "Fisierul nu a fost incarcat.";
        }
        try{
            String uploadDirectory = "src/main/resources/static/uploads/";
            User user = userRepository.findByUserUsername(username).orElse(null);
            if (user != null){
            String uniqueFileName =user.getId().toString() + "-" + file.getOriginalFilename();
            Path uploadPath = Path.of(uploadDirectory);
            Path filePath = uploadPath.resolve(uniqueFileName);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            userRepository.updateProfilePicture(uniqueFileName,username);
            return "Imaginea a fost încărcată cu succes.";
        }}
        catch (IOException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
    public byte[] getImage(String username) throws IOException {

        String imageDirectory = "src/main/resources/static/uploads/";
       try{
      User user = userRepository.findByUserUsername(username).orElse(null);
      String imageName = user.getProfilePicture();
      if(imageName != null){
       Path imagePath = Path.of(imageDirectory, imageName);
      if (Files.exists(imagePath)) {
           byte[] imageBytes = Files.readAllBytes(imagePath);
         return imageBytes;
       }}}
       catch (Exception e)
       {
          throw new RuntimeException(e);
       }
      return null;
    }
    public void deleteAllImage()  {
        String directoryPath = "src/main/resources/static/uploads/";
        try {
            Path directory = Paths.get(directoryPath);
            if (Files.exists(directory) && Files.isDirectory(directory)) {
                Files.walk(directory)
                        .filter(Files::isRegularFile)
                        .forEach(file -> {
                            try {
                                Files.delete(file);
                                System.out.println("Imagine stearsa: " + file);
                            } catch (IOException e) {
                                System.err.println("Eroare la stergerea imaginii: " + file);
                                throw new RuntimeException(e);
                            }
                        });
                System.out.println("Toate imaginile au fost șterse cu succes");
            } else {
                System.err.println("Directorul specificat nu există sau nu este un director valid.");
            }
        } catch (IOException e) {
            System.err.println("Eroare la accesarea directorului: " + directoryPath);
            throw new RuntimeException(e);
        }
    }

    public String uploadImagePhoto(MultipartFile file, Long recipeId) {

        if (file.isEmpty()) {
            return "Fisierul nu a fost incarcat.";
        }
        try{
            String uploadDirectory = "src/main/resources/static/uploads/";
            Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
            if (recipe != null){
                String uniqueFileName =recipe.getId().toString() + "-" + file.getOriginalFilename();
                Path uploadPath = Path.of(uploadDirectory);
                Path filePath = uploadPath.resolve(uniqueFileName);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                recipeRepository.updateImage(uniqueFileName,recipeId);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                return "Imaginea a fost încărcată cu succes.";
            }}
        catch (IOException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public byte[] getRecipePhoto(Long id) throws IOException {

        String imageDirectory = "src/main/resources/static/uploads/";
        try{
            Recipe recipe = recipeRepository.findById(id).orElse(null);
            String imageName = recipe.getImage();
            Path imagePath = Path.of(imageDirectory, imageName);
            if (Files.exists(imagePath)) {
                byte[] imageBytes = Files.readAllBytes(imagePath);
                return imageBytes;
            }}
        catch (Exception e)
        {
            throw new RuntimeException(e);
        }
        return null;
    }
}
