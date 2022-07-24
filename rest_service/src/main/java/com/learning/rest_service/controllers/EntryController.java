package com.learning.rest_service.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EntryController {
    @GetMapping("/")
    public String hello(){
        return "index";
    }
}
