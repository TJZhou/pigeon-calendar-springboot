package com.info6150.pigeon.controller;

import com.info6150.pigeon.model.User;
import com.info6150.pigeon.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

@RestController
public class UserControllers {

    @Autowired
    private UserServiceImpl userService;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public Collection<User> getUserList() {
        return userService.getUsers();
    }

    @RequestMapping(value = "/user/" + "{userName}", method = RequestMethod.GET)
    public User getUser(@PathVariable String userName, HttpServletResponse resp) {
        User u = userService.findUserByUsername(userName);
        return u;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public void addUser(@RequestBody User u) {
        userService.createUser(u);
    }

    @RequestMapping(value = "/user/{userName}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String userName, HttpServletResponse resp) {
        userService.deleteUserById(userName);
    }
}
