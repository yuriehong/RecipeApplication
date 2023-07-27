package com.yuj.dev.cookbook.repos;

import com.yuj.dev.cookbook.models.Recipe;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface RecipeRepo extends ReactiveCosmosRepository<Recipe, String> {
    Mono<Recipe> getRecipeById(String id);
    Flux<Recipe> getRecipesByUserId(String userId);
}