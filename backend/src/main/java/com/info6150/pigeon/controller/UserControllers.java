package com.info6150.pigeon.controller;

import com.info6150.pigeon.model.User;
import com.info6150.pigeon.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping(value = "/user")
public class UserControllers {

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(method = RequestMethod.GET)
    public Collection<User> getUserList() {
        return userService.getUsers();
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public User getUserByUsername(@PathVariable String username) {
        return userService.findUserByUsername(username);
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public Optional<User> getUserById(@PathVariable String id){
        return userService.findUserById(id);
    }

    @RequestMapping(method = RequestMethod.POST)
    public void addUser(@RequestBody User u) {
        userService.createUser(u);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String username) {
        userService.deleteUserById(username);
    }
}
