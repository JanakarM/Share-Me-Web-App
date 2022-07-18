package com.learning.rest_service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.learning.rest_service.component.BeanUtil;
import com.learning.rest_service.model.User;
import com.learning.rest_service.storage.database.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Collections;

@SpringBootApplication
public class RestServiceApplication {

	public static void main(String[] args) throws Exception{
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
