package com.yuj.dev.cookbook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;

@SpringBootApplication
public class CookbookApplication {

	public static void main(String[] args) {
		SpringApplication.run(CookbookApplication.class, args);
	}

}
