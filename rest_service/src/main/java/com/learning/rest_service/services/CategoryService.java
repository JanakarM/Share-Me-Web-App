package com.learning.rest_service.services;

import com.learning.rest_service.model.Category;
import com.learning.rest_service.storage.database.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Iterable<Category> listCategories(){
        return categoryRepository.findAll();
    }
}
