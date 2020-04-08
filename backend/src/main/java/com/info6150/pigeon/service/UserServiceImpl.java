package com.info6150.pigeon.service;

import com.info6150.pigeon.exceptions.PasswordNotMatchException;
import com.info6150.pigeon.exceptions.UserAlreadyExistsException;
import com.info6150.pigeon.exceptions.UserNotFoundException;
import com.info6150.pigeon.model.User;
import com.info6150.pigeon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.Collection;
import java.util.Optional;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        if(findUserByUsername(user.getUsername()) != null)
            throw new UserAlreadyExistsException("User already exists. Please login.");
        return userRepository.save(user);
    }

    public User updateUserById(String id, User user) {
        User u = findUserByUsername(id);
        if(u == null)
            throw new UserNotFoundException("User doesn't exists");
        u.setEmail(user.getEmail());
        u.setPassword(user.getPassword());
        userRepository.save(u);
        return u;
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public User updateUserByUsername(String username, User user) {
        User u = findUserByUsername(username);
        if(u == null)
            throw new UserNotFoundException("User doesn't exists");
        u.setEmail(user.getEmail());
        u.setPassword(user.getPassword());
        userRepository.save(u);
        return u;
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

    public UserDetails loadUserByUsername(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UserNotFoundException("User not found!");
        } else {
            if(!user.getPassword().equals(password))
                throw new PasswordNotMatchException("Bad Credential!");
            // Be careful of the package name, cause there are two model "User". One defined by ourselves, the other defined by Spring
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayDeque<>());
        }
    }
}