package com.info6150.pigeon.service;

import com.info6150.pigeon.model.User;
import com.info6150.pigeon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUserById(String id, User user) {
        deleteUserById(id);
        createUser(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public void updateUserByUsername(String username, User user) {
        deleteUserByUsername(username);
        createUser(user);
    }

    public void deleteUserByUsername(String username) {
        userRepository.deleteByUsername(username);
    }

    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findUserById(String id) {
        return userRepository.findById(id);
    }

    public Collection<User> getUsers() {
        return userRepository.findAll();
    }
}