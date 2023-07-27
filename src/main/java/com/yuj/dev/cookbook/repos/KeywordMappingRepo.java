package com.yuj.dev.cookbook.repos;

import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;
import com.yuj.dev.cookbook.models.KeywordMapping;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface KeywordMappingRepo extends ReactiveCosmosRepository<KeywordMapping, String> {
    Mono<KeywordMapping> getKeywordMappingById(String id);
    Flux<KeywordMapping> getKeywordMappingByUserId(String userId);
}
