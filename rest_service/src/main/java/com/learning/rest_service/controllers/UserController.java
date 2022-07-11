package com.learning.rest_service.controllers;

import com.learning.rest_service.model.User;
import com.learning.rest_service.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    @GetMapping("/{id}")
    User getUser(@PathVariable Long id){
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/delete")
    String deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return "Deleted";
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