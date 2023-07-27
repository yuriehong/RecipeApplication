package com.yuj.dev.cookbook.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Document(collection = "KeywordMapping")
public class KeywordMapping implements Serializable {
    @Id
    private String id;
    @PartitionKey
    private String userId;
    // will be map of keyword -> list of recipeIds
    private Map<String, List<String>> keywordMapping;

    @JsonCreator
    public KeywordMapping(@JsonProperty("id") String id, @JsonProperty("userId") String userId, @JsonProperty("keywordMapping") Map<String, List<String>> keywordMapping) {
        // create vs update
        this.id = (id != null) ? id : UUID.randomUUID().toString();
        this.userId = userId;
        this.keywordMapping = keywordMapping;
    }

    public String getUserId() { return this.userId; }

    public void setUserId(String userId) { this.userId = userId; }

    public String getId() { return this.id; }

    public Map<String, List<String>> getKeywordMapping() { return this.keywordMapping; }

    public void setKeywordMapping(Map<String, List<String>> keywordMapping) { this.keywordMapping = keywordMapping; }

}
