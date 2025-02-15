package com.learning.server.services;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.learning.server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleLoginService {
    @Autowired
    GoogleIdTokenVerifier verifier;

    public User verifySignature(String token){
        try{
            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                return new User(name, email, pictureUrl);
            } else {
                System.out.println("Invalid ID token.");
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
