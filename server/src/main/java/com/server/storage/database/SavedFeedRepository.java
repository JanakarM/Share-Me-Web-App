package com.server.storage.database;

import com.server.model.SavedFeed;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface SavedFeedRepository extends CrudRepository<SavedFeed, Long> {
    @Query(value = "select feed_id from saved_feed where user_id=?1", nativeQuery = true)
    Iterable<Long> findSavedFeedIdsForUserId(Long userId);
    @Modifying
    @Transactional
    @Query(value = "delete from saved_feed where user_id=?1 and feed_id=?2", nativeQuery = true)
    void removeSavedFeedForUserId(Long userId, Long feedId);
}
