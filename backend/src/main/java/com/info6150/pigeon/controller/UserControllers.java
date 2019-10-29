package com.info6150.pigeon.controller;

import com.info6150.pigeon.model.User;
import com.info6150.pigeon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
public class UserControllers {

    @Autowired
    private UserRepository repo;

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public @ResponseBody List<User> getUserList(){
        return repo.findAll();
    }

    @RequestMapping(value = "/user/{userName}", method = RequestMethod.GET)
    public @ResponseBody User getUser(@PathVariable String userName, HttpServletResponse resp){
        User u = repo.findByUsername(userName);
        if(u == null) resp.setStatus(400);
        else resp.setStatus(200);
        return u;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public @ResponseBody void addUser(@RequestBody User u){
        repo.save(u);
    }

    @RequestMapping(value = "/user/{userName}", method = RequestMethod.DELETE)
    public @ResponseBody void deleteUser(@PathVariable String userName, HttpServletResponse resp){
        User u = repo.findByUsername(userName);
        if(u == null) {
            resp.setStatus(400);
        }
        else {
            resp.setStatus(200);
            repo.deleteByUsername(userName);
        }
    }
}
