package com.yuj.dev.cookbook.controllers;

import com.yuj.dev.cookbook.models.KeywordMapping;
import com.yuj.dev.cookbook.models.User;
import com.yuj.dev.cookbook.repos.UserRepo;
import com.yuj.dev.cookbook.services.KeywordMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/userApi")
public class UserController {

    private UserRepo userRepo;
    @Autowired
    private KeywordMappingService keywordMappingService;

    public UserController(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable String userId) {
        return this.userRepo.findById(userId).block();
    }

    @PostMapping("/user")
    public User createUser(@Valid @RequestBody User user) {
        return keywordMappingService.createUserAndKeywordMapping(user);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return this.userRepo.findAll().collectList().block();
    }
}
