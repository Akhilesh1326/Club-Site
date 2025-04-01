package com.example.auth.auth_service.DTO;

import java.util.UUID;

public class UserInfoDTO {
    private UUID id;
    private String firstName;
    private String lastName;
    private String role;
    private String profilePictureUrl;
    private int year;
    private String department;

    public UserInfoDTO(UUID id, String firstName, String lastName, String role,
                       String profilePictureUrl, int year, String department) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.profilePictureUrl = profilePictureUrl;
        this.year = year;
        this.department = department;
    }


    // Getters and Setters
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

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
