package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}
	
	@GetMapping("/Hai")
	public String index() {
		return "Hello! How are you?";
	}
	
	@GetMapping("/End")
	public String index() {
		return "Good bye!";
	}

}
