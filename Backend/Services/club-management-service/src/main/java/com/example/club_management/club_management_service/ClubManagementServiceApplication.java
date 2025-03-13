package com.example.club_management.club_management_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ClubManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ClubManagementServiceApplication.class, args);
	}

}
