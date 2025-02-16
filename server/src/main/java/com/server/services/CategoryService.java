package com.server.services;

import com.server.model.Category;
import com.server.storage.database.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public Iterable<Category> listCategories(){
        return categoryRepository.findAll();
    }
}
