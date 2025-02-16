package com.server.services;

import com.server.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class AuthenticationService {
    @Autowired
    GoogleLoginService googleLoginService;
    public User verifySignature(String token){
        return googleLoginService.verifySignature(token);
    }
    public void updateSecurityContextWithLoggedInUserDetails(User user){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken= new UsernamePasswordAuthenticationToken(user.getName(), null, Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
        usernamePasswordAuthenticationToken.setDetails(user);
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }
    public User currentUser(){
        Authentication auth= SecurityContextHolder.getContext().getAuthentication();
        if(auth.isAuthenticated() && !(auth instanceof AnonymousAuthenticationToken)){
            return (User) auth.getDetails();
        }
        return null;
    }
}
