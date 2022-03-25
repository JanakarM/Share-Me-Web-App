package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!" + System.getenv("NAME");
	}
	
	// @GetMapping("/Hai")
	public String hai() {
		return "Hello!";
	}
	
	// @GetMapping("/Bye")
	public String bye() {
		return "Bye! Hope to see you again.";
	}
}
