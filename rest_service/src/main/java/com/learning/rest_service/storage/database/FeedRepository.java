package com.learning.rest_service.storage.database;

import com.learning.rest_service.model.Feed;
import org.springframework.data.repository.CrudRepository;

public interface FeedRepository extends CrudRepository<Feed, Long> {
}
