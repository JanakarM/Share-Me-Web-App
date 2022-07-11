package com.learning.rest_service.services;

import com.learning.rest_service.model.Category;
import com.learning.rest_service.model.Feed;
import com.learning.rest_service.model.User;
import com.learning.rest_service.storage.database.FeedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class FeedService {
    @Autowired
    FeedRepository feedRepository;
    @Autowired
    CategoryService categoryService;
    @Autowired
    FileStorageService fileStorageService;
    public String addFeed(String title, String about, String siteUrl, Long authorId, MultipartFile image, Long categoryId){
        try {
            String fileName= String.format("user_profile_%s_%s_%s", title,System.currentTimeMillis(), image.getOriginalFilename());
            feedRepository.save(new Feed(title, fileName, about, siteUrl, new User(authorId), new Category(categoryId)));
            fileStorageService.store(image, fileName);
            return String.format("Successfully added feed '%s'", title);
        } catch (Exception e) {
            return String.format("Failed to add feed '%s' \n%s", title, e.getLocalizedMessage());
        }
    }

    public Iterable<Feed> listFeeds(){
        return feedRepository.findAll();
    }

    public Iterable<Category> listCategories(){
        return categoryService.listCategories();
    }

    public void deleteFeed(Long id){
        feedRepository.deleteById(id);
    }
}
