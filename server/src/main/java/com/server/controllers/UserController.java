package com.server.controllers;

import com.server.model.User;
import com.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins= "*")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping()
    Iterable<User> listUsers(@RequestParam(required = false) String name){
        if(name == null){
            return userService.listUsers();
        }
        return userService.getUserByName(name);
    }

    @GetMapping("/me")
    Object me(Authentication auth){
        return auth!=null? auth.getDetails(): null;
    }

    @GetMapping("/{id}")
    Optional<User> getUser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/delete")
    String deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return "Deleted";
    }

    @GetMapping("/login")
    User login(@RequestHeader String Authorization){
        return userService.login(Authorization.replace("Bearer ", ""));
    }

    @GetMapping("/logout")
    String logout(){
        userService.logout();
        return "Logged Out";
    }

    @PostMapping(
            path= "/add",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    User add(@RequestBody Map<String, String> payload){
        return userService.addUser(payload.get("name"), payload.get("email"), payload.get("picture"));
    }
}