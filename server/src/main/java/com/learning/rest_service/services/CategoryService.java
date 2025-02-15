package com.learning.server.services;

import com.learning.server.model.Category;
import com.learning.server.storage.database.CategoryRepository;
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
