package com.example.springboot;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
// import org.springframework.boot.builder.SpringApplicationBuilder;
// import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@EnableDiscoveryClient
// @EnableEurekaClient
// public class Application extends SpringBootServletInitializer {
// @ComponentScan(useDefaultFilters=false)
public class ConsumerApplication{
	public static void main(String[] args) {
		// System.setProperty("spring.config.name", "consumer");
		SpringApplication.run(ConsumerApplication.class, args);
		// ApplicationContext ctx = SpringApplication.run(Application.class, args);

		// System.out.println("Let's inspect the beans provided by Spring Boot:");

		// String[] beanNames = ctx.getBeanDefinitionNames();
		// Arrays.sort(beanNames);
		// for (String beanName : beanNames) {
		// 	System.out.println(beanName);
		// }
	}

	@LoadBalanced    // Make sure to create the load-balanced template
    @Bean
    RestTemplate restTemplate() {
        return new RestTemplate();
    }
	// @Bean
	// public RestTemplate restTemplate(RestTemplateBuilder builder) {
	// 	return builder.build();
	// }
	@Bean
	public String index() {
		return "1st Bean!";
	}
	
	// Used when deploying to a standalone servlet container
	// @Override
	// protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
	// return application.sources(Application.class);
	// }	
}
