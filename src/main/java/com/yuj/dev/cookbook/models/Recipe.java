package com.yuj.dev.cookbook.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Document(collection = "Recipes")
public class Recipe implements Serializable {

    @Id
    private String id;
    @PartitionKey
    private String userId;
    private String name;
    private String summary;
    private List<Ingredient> ingredients;
    private List<String> instructions;
    private Date date;
    private List<String> keywords;

    @JsonCreator
    public Recipe(@JsonProperty("id") String id, @JsonProperty("userId") String userId, @JsonProperty("name") String name, @JsonProperty("summary") String summary, @JsonProperty("ingredients") List<Ingredient> ingredients, @JsonProperty("instructions") List<String> instructions, @JsonProperty("date") Date date, @JsonProperty("keywords") List<String> keywords) {
        LocalDate localDate = LocalDate.now();
        this.userId = userId;
        // create vs update
        this.id = (id != null) ? id : UUID.randomUUID().toString();
        this.date = (date != null) ? date : java.util.Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        this.name = name;
        this.summary = summary;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.keywords = keywords;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSummary() {
        return this.summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getInstructions() {
        return this.instructions;
    }

    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }

    public List<Ingredient> getIngredients() {
        return this.ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Date getDate() { return this.date; }

    public List<String> getKeywords() { return this.keywords; }

    public void setKeywords(List<String> keywords) { this.keywords = keywords; }

}