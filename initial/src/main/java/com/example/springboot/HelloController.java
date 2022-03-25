package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@RestController
// @RequestMapping("/external-config")
public class HelloController {
	@Value("${USER}")
	String v;
	@Value("${DB_MANAGER_SERVICE}")
	String dbmanager;
	// @Value("${NAME}")
	// String n;
	RestTemplate restTemplate;

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return restTemplate=builder.build();
	}

	@GetMapping("/")
	public String index() {
		// return "Greetings from Spring Boot!" + System.getenv("NAME");
		// return "Greetings from Spring Boot! " + v + "--" + n;
		return "Greetings from Spring Boot! " + v;
	}
	
	@GetMapping("/listusers")
	public String listusers() {
		return restTemplate.getForObject(
					dbmanager+"listusers", String.class);
	}
	
	// @GetMapping("/Bye")
	public String bye() {
		return "Bye! Hope to see you again.";
	}
	
}
