package com.licenta.bechefbackend;

import com.licenta.bechefbackend.DTO.UserDTO;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BeChefBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(BeChefBackendApplication.class, args);
	}

}
