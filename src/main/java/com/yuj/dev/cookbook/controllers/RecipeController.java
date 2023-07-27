package com.yuj.dev.cookbook.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yuj.dev.cookbook.models.Recipe;
import com.yuj.dev.cookbook.repos.RecipeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipeApi")
public class RecipeController {

    private RecipeRepo recipeRepo;

    @Autowired
    @Qualifier("redisTemplate")
    private RedisTemplate recipeTemplate;
    @Autowired
    @Qualifier("stringRedisTemplate")
    private RedisTemplate recipeListTemplate;
    private RedisSerializer<Recipe> recipeSerializer = new Jackson2JsonRedisSerializer<>(Recipe.class);

    public RecipeController(RecipeRepo recipeRepo) {
        this.recipeRepo = recipeRepo;
    }

    @GetMapping("/recipe/{recipeId}")
    public Recipe GetRecipe(@PathVariable String recipeId) throws JsonProcessingException {
        ValueOperations<String, Recipe> ops = this.recipeTemplate.opsForValue();
        setUpRecipeRedisTemplate();
        if (this.recipeTemplate.hasKey(recipeId)) {
            return ops.get(recipeId);
        }
        return this.recipeRepo.getRecipeById(recipeId).block();
    }

    @PostMapping("/recipe")
    public Recipe CreateRecipe(@Valid @RequestBody Recipe recipe) throws JsonProcessingException {
        ValueOperations<String, Recipe> recipeOps = this.recipeTemplate.opsForValue();
        ValueOperations<String, String> recipeListOps = this.recipeListTemplate.opsForValue();
        setUpRecipeRedisTemplate();
        String userKey = recipe.getUserId();
        ObjectMapper mapper = setUpObjectMapper();
        String recipeIdList = mapper.writeValueAsString(Collections.singleton(recipe.getId()));
        final Mono<Recipe> recipeMono = this.recipeRepo.save(recipe);
        Recipe createdRecipe = recipeMono.block();
        String recipeKey = createdRecipe.getId();

        if (!this.recipeTemplate.hasKey(recipeKey)) {
            recipeOps.set(recipeKey, recipe);
        }

        if (!this.recipeListTemplate.hasKey(userKey)) {
            recipeListOps.set(userKey, recipeIdList);
        } else {
            // retrieve current set and append to it
            String recipeList = recipeListOps.get(userKey);
            Set<String> recipeIds = mapper.readValue(recipeList, Set.class);
            recipeIds.add(recipeKey);
            recipeListOps.set(userKey, mapper.writeValueAsString(recipeIds));
        }
        return createdRecipe;
    }

    @DeleteMapping("/recipe/{recipeId}")
    public ResponseEntity<Void> DeleteRecipe(@PathVariable String recipeId) {
        ValueOperations<String, String> recipeListOps = this.recipeListTemplate.opsForValue();
        setUpRecipeRedisTemplate();
        ObjectMapper mapper = setUpObjectMapper();
        try {
            Recipe recipe = this.recipeRepo.getRecipeById(recipeId).block();
            this.recipeRepo.delete(recipe).block();
            // need to delete recipe from cache
            String userKey = recipe.getUserId();
            this.recipeTemplate.delete(recipeId);
            if (this.recipeListTemplate.hasKey(userKey)) {
                String recipeList = recipeListOps.get(userKey);
                Set<String> recipeIds = mapper.readValue(recipeList, Set.class);
                recipeIds.remove(recipeId);
                recipeListOps.set(userKey, mapper.writeValueAsString(recipeIds));
            }
            return ResponseEntity.noContent().build();
        } catch(Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/recipe/{recipeId}")
    public Recipe UpdateRecipe(@Valid @RequestBody Recipe recipe) {
        final Mono<Recipe> recipeMono = this.recipeRepo.save(recipe);
        return recipeMono.block();
    }

    @GetMapping("/recipes/{userId}")
    public List<Recipe> GetRecipes(@PathVariable String userId) throws JsonProcessingException {
        ValueOperations<String, Recipe> recipeOps = this.recipeTemplate.opsForValue();
        ValueOperations<String, String> recipeListOps = this.recipeListTemplate.opsForValue();
        setUpRecipeRedisTemplate();
        ObjectMapper mapper = setUpObjectMapper();
        if (!this.recipeListTemplate.hasKey(userId)) {
            List<Recipe> recipes = this.recipeRepo.getRecipesByUserId(userId).collectList().block();
            Set<String> recipeIds = recipes.stream().map(recipe -> recipe.getId()).collect(Collectors.toSet());
            String recipeIdList = mapper.writeValueAsString(recipeIds);
            recipeListOps.set(userId, recipeIdList);
            return recipes;
        } else {
            String recipeList = recipeListOps.get(userId);
            Set<String> recipeIds = mapper.readValue(recipeList, Set.class);
            return recipeIds.stream().map(recipeId -> recipeOps.get(recipeId)).collect(Collectors.toList());
        }
    }

    private void setUpRecipeRedisTemplate() {
        this.recipeTemplate.setKeySerializer(new StringRedisSerializer());
        this.recipeTemplate.setValueSerializer(recipeSerializer);
    }

    private ObjectMapper setUpObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // this is needed for the case where only 1 id exists in set
        mapper.enable(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY);
        return mapper;
    }
}
