package com.licenta.bechefbackend;

import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class BeChefBackendApplication implements CommandLineRunner {
	@Autowired
	private UserRepository userRepository;
	public static void main(String[] args) {
		SpringApplication.run(BeChefBackendApplication.class, args);
	}
	public void run(String...args){
		Optional<User> adminAccount = userRepository.findByRole(Role.ADMIN);
		if (!adminAccount.isPresent())
		{
			User user = new User();
			user.setEmail("ceobanu_alexandra@yahoo.com");
			user.setUsername("admin");
			user.setRole(Role.ADMIN);
			user.setPassword(new BCryptPasswordEncoder().encode("admin"));
			userRepository.save(user);
		}
	}
}
