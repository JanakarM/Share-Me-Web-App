package com.server.storage.database;

import com.server.model.Feed;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface FeedRepository extends CrudRepository<Feed, Long> {
    @Query(value = "select * from feed order by id limit ?1, ?2", nativeQuery = true)
    Iterable<Feed> getFeedsByBatch(int offset, int count);
}
