package com.info6150.pigeon.repository;

import com.info6150.pigeon.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
     void deleteByUsername(String username);
     User findByUsername(String username);
}