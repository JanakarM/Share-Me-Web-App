package com.learning.rest_service.services;

import com.learning.rest_service.model.Category;
import com.learning.rest_service.model.Feed;
import com.learning.rest_service.model.User;
import com.learning.rest_service.storage.database.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
public class FeedService {
    @Autowired
    FeedRepository feedRepository;
    @Autowired
    CategoryService categoryService;
    @Autowired
    FileStorageService fileStorageService;
    @Autowired
    UserService userService;
    public String addFeed(String title, String about, String siteUrl, Long authorId, MultipartFile image, Long categoryId){
        try {
            String fileName= String.format("feed-images/feed_%s_%s_%s", title,System.currentTimeMillis(), image.getOriginalFilename());
            feedRepository.save(new Feed(title, fileName, about, siteUrl, new User(authorId), new Category(categoryId)));
            fileStorageService.store(image, fileName);
            return String.format("Successfully added feed '%s'", title);
        } catch (Exception e) {
            return String.format("Failed to add feed '%s' \n%s", title, e.getLocalizedMessage());
        }
    }

    public Optional<Feed> getFeed(Long id){
        return feedRepository.findById(id);
    }

    public Iterable<Feed> listFeeds(){
        return feedRepository.findAll();
    }
    public Iterable<Feed> listFeeds(int pageNumber, int countPerPage){
        return feedRepository.getFeedsByBatch(countPerPage*(pageNumber-1), countPerPage);
    }

    public Iterable getSavedFeeds(){
        return userService.getSavedFeeds();
    }

    public Iterable<Category> listCategories(){
        return categoryService.listCategories();
    }

    public void deleteFeed(Long id){
        feedRepository.deleteById(id);
    }

    public void saveFeed(Long feedId){
        userService.saveFeed(feedId);
    }

    public void removeSavedFeed(Long feedId){
        userService.removeSavedFeed(feedId);
    }
}