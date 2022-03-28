package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;
import java.util.*;

@RestController
// @RequestMapping("/external-config")
// @ComponentScan(useDefaultFilters=false)
public class ConsumerController {
	// @Value("${USER}")
	// String v;
	@Value("${DB_MANAGER_SERVICE}")
	String dbmanager;
	
	// @Value("${NAME}")
	// String n;
	@Autowired
	String s;

	@Autowired
	@LoadBalanced
	RestTemplate restTemplate;

	@Autowired
    private DiscoveryClient client;

	@GetMapping("/hai")
	public String index() {
		// return "Greetings from Spring Boot!" + System.getenv("NAME");
		// return "Greetings from Spring Boot! " + v + "--" + n;
		return "Greetings from Spring Boot! ";
	}
	
	@GetMapping("/listusers")
	public String listusers() {
	// 	// get ServiceInstance list using serviceId
    //    List<ServiceInstance> siList = client.getInstances(dbmanager);

    //    // read manually one instance from index#0 
    //    ServiceInstance si = siList.get(0);

    //    // read URI and Add path that returns url
    //    String url = si.getUri() +"/listusers";
	//    System.out.println(url);
	   String url="http://"+dbmanager+"/listusers";
	   return restTemplate.getForObject(
					url, String.class);
	}
	
	// @GetMapping("/Bye")
	public String bye() {
		return "Bye! Hope to see you again.";
	}
	
}
