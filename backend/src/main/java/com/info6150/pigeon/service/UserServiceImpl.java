package com.info6150.pigeon.service;

//import com.info6150.pigeon.model.User;
//import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Service;
//
//@Service("userRepo")
//public interface UserServiceImpl extends MongoRepository<User, String> {
//    public User findByUsername(String username);
//    public void deleteByUsername(String username);
//}

import com.info6150.pigeon.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collection;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Resource
    MongoTemplate mongoTemplate;

    @Override
    public void createUser(User user) {
        mongoTemplate.insert(user);
    }

    @Override
    public void updateUserById(String id, User user) {
        deleteUserById(id);
        createUser(user);
    }

    @Override
    public void deleteUserById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        mongoTemplate.remove(query, User.class);
    }

    @Override
    public void updateUserByUsername(String userName, User user) {
        deleteUserByUsername(userName);
        createUser(user);
    }

    @Override
    public void deleteUserByUsername(String userName) {
        Query query = new Query(Criteria.where("username").is(userName));
        mongoTemplate.remove(query, User.class);
    }

    @Override
    public User findUserByUsername(String userName) {
        Query query = new Query(Criteria.where("username").is(userName));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public User findUserById(String id) {
        return mongoTemplate.findById(id, User.class);
    }

    @Override
    public Collection<User> getUsers() {
        return mongoTemplate.findAll(User.class);
    }
}