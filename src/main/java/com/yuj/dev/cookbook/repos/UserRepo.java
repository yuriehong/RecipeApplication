package com.yuj.dev.cookbook.repos;

import com.yuj.dev.cookbook.models.User;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepo extends ReactiveCosmosRepository<User, String> {
    Mono<User> findById(String id);
}