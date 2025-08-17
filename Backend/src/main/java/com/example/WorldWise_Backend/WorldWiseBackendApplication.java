package com.example.WorldWise_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.example.WorldWise_Backend")

public class WorldWiseBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorldWiseBackendApplication.class, args);
	}

}
