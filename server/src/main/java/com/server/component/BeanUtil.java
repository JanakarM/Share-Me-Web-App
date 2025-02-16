package com.server.component;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Component
public class BeanUtil {
    @Bean
    public static RestTemplate restTemplate(RestTemplateBuilder restTemplateBuilder){
        return restTemplateBuilder.build();
    }

    @Bean
    public static GoogleIdTokenVerifier googleIdTokenVerifier(@Value("${google-api.client-id}") String clientId) {
        HttpTransport transport= new NetHttpTransport();
        JsonFactory jsonFactory= new GsonFactory();
        return new GoogleIdTokenVerifier.Builder(transport, jsonFactory).
                setAudience(Collections.singletonList(clientId)).
                build();
    }
}
