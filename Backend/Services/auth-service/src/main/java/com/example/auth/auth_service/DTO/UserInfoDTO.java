package com.example.auth.auth_service.DTO;

import java.util.UUID;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.example.auth.auth_service.Model.Auth_Users.Role;

public class UserInfoDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String role;
    private String profilePictureUrl;
    private Integer year;
    private String department;

    // Default constructor for frameworks
    public UserInfoDTO() {
    }

    // Annotated constructor for deserialization
    @JsonCreator
    public UserInfoDTO(
            @JsonProperty("id") UUID id,
            @JsonProperty("firstName") String firstName,
            @JsonProperty("lastName") String lastName,
            @JsonProperty("role") Role roleEnum,
            @JsonProperty("profilePictureUrl") String profilePictureUrl) {

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = roleEnum.toString();
        this.profilePictureUrl = profilePictureUrl;

    }

    // Original constructor
    public UserInfoDTO(UUID id, String firstName, String lastName, String role,
                       String profilePictureUrl, Integer year, String department) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.profilePictureUrl = profilePictureUrl;
        this.year = year;
        this.department = department;
    }

    // Getters and Setters remain the same
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName(){
        return lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public void setProfilePictureUrl(String profileUrl) {
        this.profilePictureUrl = profileUrl;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}