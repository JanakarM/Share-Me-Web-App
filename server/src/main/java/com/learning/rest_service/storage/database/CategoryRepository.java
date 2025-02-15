package com.learning.rest_service.storage.database;

import com.learning.rest_service.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
