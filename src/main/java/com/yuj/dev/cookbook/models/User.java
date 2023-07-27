package com.yuj.dev.cookbook.models;

import org.springframework.data.annotation.Id;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import java.util.UUID;

@Document(collection = "Users")
public class User {
    @Id
    @PartitionKey
    private String id;
    private String name;
    private String firstName;
    private String lastName;
    private String email;

    public User(String name, String firstName, String lastName, String email) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return this.name;
    }

    public void setUsername(String newName) {
        this.name = newName;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
