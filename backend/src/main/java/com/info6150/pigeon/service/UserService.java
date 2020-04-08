package com.info6150.pigeon.service;

import com.info6150.pigeon.model.User;

import java.util.Collection;
import java.util.Optional;

public interface UserService {
    User createUser(User user);

    User updateUserById(String id, User user);

    void deleteUserById(String id);

    User updateUserByUsername(String userName, User user);

    void deleteUserByUsername(String userName);

    User findUserByUsername(String userName);

    Optional<User> findUserById(String id);

    // Collection<User> getUsers();
}