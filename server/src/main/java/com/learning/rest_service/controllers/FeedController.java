package com.learning.server.controllers;

import com.learning.server.model.Category;
import com.learning.server.model.Feed;
import com.learning.server.services.FeedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/feed")
@CrossOrigin(origins = "*")
public class FeedController {
    @Autowired
    FeedService feedService;

    @GetMapping()
    public Iterable<Feed> listFeeds(@RequestParam Integer pageNumber, Integer countPerPage){
        return feedService.listFeeds(pageNumber, countPerPage);
    }

    @GetMapping("/saved")
    public Iterable getSavedFeeds(){
        return feedService.getSavedFeeds();
    }

    @DeleteMapping("/saved/remove")
    public String removeSavedFeed(@RequestParam Long feedId){
        feedService.removeSavedFeed(feedId);
        return "Success";
    }

    @GetMapping("/{id}")
    public Optional<Feed> getFeed(@PathVariable Long id){
        return feedService.getFeed(id);
    }

    @PostMapping(
            path = "/add",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    String addFeed(@RequestParam(value = "title") String title,
                   @RequestParam(value = "about") String about,
                   @RequestParam(value = "site") String site,
                   @RequestParam(value = "category") Long category,
                   @RequestParam(value = "author") Long author,
                   @RequestParam(value = "image") MultipartFile image){
        feedService.addFeed(title, about, site, author, image, category);
        return "Success";
    }

    @DeleteMapping("/{id}")
    String deleteFeed(@PathVariable Long id){
        feedService.deleteFeed(id);
        return "Success";
    }
    @GetMapping("/categories")
    Iterable<Category> listCategories(){
        return feedService.listCategories();
    }

    @PostMapping(
            path= "/save",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE
    )
    String add(@RequestBody Map<String, Long> payload){
        feedService.saveFeed(payload.get("feedId"));
        return "Success";
    }
}
