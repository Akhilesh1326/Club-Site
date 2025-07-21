package com.example.auth.auth_service.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;

public class AuthUserDTO {

    private String userName;
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate DOB;

    private String collegeOrUniversityName;
    private String role;
    private String phoneNumber;
    private String profilePictureUrl;  // Changed from profile_picture_url to follow camelCase
    private String state;
    private String city;
    private String department;
    private Integer year;

    // Constructors
    public AuthUserDTO() {}

    // Getters
    public String getUserName() {
        return this.userName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public LocalDate getDOB() {
        return this.DOB;
    }

    public String getCollegeOrUniversityName() {
        return this.collegeOrUniversityName;
    }

    public String getRole() {
        return this.role;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    public String getState() {
        return state;
    }

    public String getCity() {
        return city;
    }

    public String getDepartment() {
        return department;
    }

    public Integer getYear() {
        return year;
    }

    // Setters (THESE WERE MISSING!)
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setDOB(LocalDate DOB) {
        this.DOB = DOB;
    }

    public void setCollegeOrUniversityName(String collegeOrUniversityName) {
        this.collegeOrUniversityName = collegeOrUniversityName;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setProfilePictureUrl(String profilePictureUrl) {
        this.profilePictureUrl = profilePictureUrl;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "AuthUserDTO{" +
                "userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", DOB=" + DOB +
                ", collegeOrUniversityName='" + collegeOrUniversityName + '\'' +
                ", role='" + role + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", profilePictureUrl='" + profilePictureUrl + '\'' +
                ", state='" + state + '\'' +
                ", city='" + city + '\'' +
                ", department='" + department + '\'' +
                ", year=" + year +
                '}';
    }

    public String getProfile_picture_url() {
        return profilePictureUrl;
    }
}