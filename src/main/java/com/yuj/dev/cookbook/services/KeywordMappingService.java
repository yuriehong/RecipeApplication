package com.yuj.dev.cookbook.services;

import com.yuj.dev.cookbook.models.KeywordMapping;
import com.yuj.dev.cookbook.models.User;
import com.yuj.dev.cookbook.repos.KeywordMappingRepo;
import com.yuj.dev.cookbook.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Collections;
import java.util.UUID;

@Service
public class KeywordMappingService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private KeywordMappingRepo keywordMappingRepo;

    public User createUserAndKeywordMapping(User user) {
        final Mono<User> userMono = this.userRepo.save(user);
        // each user should have a keyword mapping object
        KeywordMapping keywordMapping = new KeywordMapping(UUID.randomUUID().toString(), user.getId(), Collections.EMPTY_MAP);
        final Mono<KeywordMapping> keywordMappingMono = this.keywordMappingRepo.save(keywordMapping);
        keywordMappingMono.block();
        return userMono.block();
    }
}
