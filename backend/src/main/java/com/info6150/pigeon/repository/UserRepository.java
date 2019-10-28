package com.info6150.pigeon.repository;

import com.info6150.pigeon.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByUsername(String username);
    public void deleteByUsername(String username);
}
