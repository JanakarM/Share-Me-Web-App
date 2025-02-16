package com.server.services;

import com.server.model.Feed;
import com.server.model.SavedFeed;
import com.server.model.User;
import com.server.storage.database.SavedFeedRepository;
import com.server.storage.database.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    FileStorageService fileStorageService;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    SavedFeedRepository savedFeedRepository;

    public List<User> listUsers(){
        return (List<User>) userRepository.findAll();
    }

    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    public Iterable<User> getUserByName(String name){
        return userRepository.findByName(name);
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

    public User addUser(String name, String email, String profileImgaeUrl){
        Resource file= restTemplate.getForObject(profileImgaeUrl, Resource.class);
        String fileName= String.format("user-profile-pictures/user_profile_%s_%s.jpg", name,System.currentTimeMillis());

        Optional<User> userOptional =  userRepository.findByEmail(email);
        return userOptional.orElseGet(() -> {
            try{
                fileStorageService.store(file, fileName);
            }catch (Exception e){
                return null;
            }
            return userRepository.save(new User(name, email, fileName));
        });
    }

    public User login(String token){
        User user= authenticationService.verifySignature(token);
        user= addUser(user.getName(), user.getEmail(), user.getProfilePicUrl());
        authenticationService.updateSecurityContextWithLoggedInUserDetails(user);
        return user;
    }

    public User me(){
        return authenticationService.currentUser();
    }

    public Iterable getSavedFeeds(){
        return savedFeedRepository.findSavedFeedIdsForUserId(me().getId());
    }

    public void saveFeed(Long feedId){
        savedFeedRepository.save(new SavedFeed(me(), new Feed(feedId)));
    }

    public void removeSavedFeed(Long feedId){
        savedFeedRepository.removeSavedFeedForUserId(me().getId(), feedId);
    }
}