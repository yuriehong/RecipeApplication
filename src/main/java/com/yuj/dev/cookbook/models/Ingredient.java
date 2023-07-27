package com.yuj.dev.cookbook.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public class Ingredient implements Serializable {
    private String name;
    private String amount;

    @JsonCreator
    public Ingredient(@JsonProperty("name") String name, @JsonProperty("amount") String amount) {
        this.name = name;
        this.amount = amount;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAmount() {
        return this.amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
