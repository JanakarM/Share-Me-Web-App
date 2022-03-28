package com.example.accessingdatamysql;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableDiscoveryClient
// @EnableEurekaClient
public class DBManagerApplication{

	public static void main(String[] args) {
		// System.setProperty("spring.config.name", "db-manager");
		ApplicationContext ctx = SpringApplication.run(DBManagerApplication.class, args);
	}
	
}
