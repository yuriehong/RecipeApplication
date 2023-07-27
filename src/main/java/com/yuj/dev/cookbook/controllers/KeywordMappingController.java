package com.yuj.dev.cookbook.controllers;

import com.yuj.dev.cookbook.models.KeywordMapping;
import com.yuj.dev.cookbook.repos.KeywordMappingRepo;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping("/keywordMappingApi")
public class KeywordMappingController {

    private KeywordMappingRepo keywordMappingRepo;

    public KeywordMappingController(KeywordMappingRepo keywordMappingRepo) {
        this.keywordMappingRepo = keywordMappingRepo;
    }

    @GetMapping("/keywordMapping/{id}")
    public KeywordMapping GetKeywordMapping(@PathVariable String id) {
        return this.keywordMappingRepo.getKeywordMappingById(id).block();
    }

    @GetMapping("/keywordMappingByUser/{userId}")
    public KeywordMapping GetKeywordMappingByUserId(@PathVariable String userId) {
        return this.keywordMappingRepo.getKeywordMappingByUserId(userId).blockFirst();
    }

    @PutMapping("/keywordMapping/{id}")
    public KeywordMapping UpdateKeywordMapping(@Valid @RequestBody KeywordMapping keywordMapping) {
        final Mono<KeywordMapping> keywordMappingMono = this.keywordMappingRepo.save(keywordMapping);
        return keywordMappingMono.block();
    }
}
