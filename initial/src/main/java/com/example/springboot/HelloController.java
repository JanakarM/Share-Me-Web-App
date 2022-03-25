package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

@RestController
// @RequestMapping("/external-config")
public class HelloController {
	@Value("${USER}")
	String v;
	@Value("${NAME}")
	String n;
	@GetMapping("/")
	public String index() {
		// return "Greetings from Spring Boot!" + System.getenv("NAME");
		return "Greetings from Spring Boot! " + v + "--" + n;
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
