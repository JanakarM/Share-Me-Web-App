package com.learning.rest_service;

import com.learning.rest_service.model.User;
import com.learning.rest_service.storage.database.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class RestServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestServiceApplication.class, args);
	}

//	@Bean
	public CommandLineRunner demo(UserRepository userRepository) {
		return (args) -> {
			// save a few customers
			userRepository.save(new User("Jana", "jana@gmail.com", "http://google.com"));
			userRepository.save(new User("Naveen", "naveen@gmail.com", "http://yahoo.com"));

		};
	}
}
