package com.learning.server.storage.database;

import com.learning.server.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Iterable<User> findByName(String name);
    Optional<User> findByEmail(String email);
}
