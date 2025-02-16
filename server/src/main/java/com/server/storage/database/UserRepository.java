package com.server.storage.database;

import com.server.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Iterable<User> findByName(String name);
    Optional<User> findByEmail(String email);
}
