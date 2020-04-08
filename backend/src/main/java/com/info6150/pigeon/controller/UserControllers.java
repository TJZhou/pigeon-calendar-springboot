package com.info6150.pigeon.controller;

import com.info6150.pigeon.configs.JwtUtil;
import com.info6150.pigeon.model.AuthenticationResponse;
import com.info6150.pigeon.model.User;
import com.info6150.pigeon.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(value = "/user")
public class UserControllers {

    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private JwtUtil jwtUtil;

    // Not Secure
//    @RequestMapping(method = RequestMethod.GET)
//    public Collection<User> getUserList() {
//        return userService.getUsers();
//    }

//    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
//    public User getUserByUsername(@PathVariable String username) {
//        return userService.findUserByUsername(username);
//    }
//
//    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
//    public Optional<User> getUserById(@PathVariable String id){
//        return userService.findUserById(id);
//    }
//
//    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
//    public void deleteUser(@PathVariable String username) {
//        userService.deleteUserById(username);
//    }

    @PostMapping(value = "/token")
    public ResponseEntity<AuthenticationResponse> userAuth(@RequestBody User u) {
        final UserDetails userDetails = userService.loadUserByUsername(u.getUsername(), u.getPassword());
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> addUser(@RequestBody User u) {
        return ResponseEntity.ok(userService.createUser(u));
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@PathVariable String username, @RequestBody User u) {
        return ResponseEntity.ok(userService.updateUserByUsername(username, u));
    }
}
