package com.learning.server.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String email;
    private String profilePicUrl;

    public User(String name, String email, String profilePicUrl) {
        this.name = name;
        this.email = email;
        this.profilePicUrl = profilePicUrl;
    }

    public User() {
    }

    public User(Long id) {
        this.id= id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setProfilePicUrl(String profilePicUrl) {
        this.profilePicUrl = profilePicUrl;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getProfilePicUrl() {
        return profilePicUrl;
    }

    @Override
    public String toString() {
        return '{' +
                "\"id\":" + id +
                ", \"name\":\"" + name + '\"' +
                ", \"email\":\"" + email + '\"' +
                ", \"profilePicUrl\":\"" + profilePicUrl + '\"' +
                '}';
    }
}
