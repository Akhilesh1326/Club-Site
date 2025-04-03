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
    private String profile_picture_url;
    private String state;
    private String city;
    private String department;
    private Integer year;


    public String getCity() {
        return city;
    }

    public String getDepartment() {
        return department;
    }

    public String getState() {
        return state;
    }

    public Integer getYear() {
        return year;
    }

    public void setProfile_picture_url(String profile_picture_url){
        this.profile_picture_url = profile_picture_url;
    }

    public String getProfile_picture_url(){
        return profile_picture_url;
    }

    public String getRole() {
        return this.role;
    }

    public String getFirstName(){
        return this.firstName;
    }

    public String getLastName(){
        return this.lastName;
    }

    public String getPhoneNumber(){
        return this.phoneNumber;
    }

    public LocalDate getDOB(){
        return this.DOB;
    }

    public String getCollegeOrUniversityName(){
        return this.collegeOrUniversityName;
    }



    public String getUserName(){
        return this.userName;
    }
    public void setUserName(String userName){
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AuthUserDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", userName='" + userName + '\'' +
                ", first name ='" + firstName + '\'' +
                ", last name ='" + lastName + '\'' +
                ", role ='" + role + '\'' +
                ", phone  ='" + phoneNumber + '\'' +
                ", dob ='" + DOB + '\'' +
                ", state ='" + state + '\'' +
                ", city ='" + city + '\'' +
                ", dept ='" + department + '\'' +
                ", yyear ='" + year + '\'' +
                ", scool ='" + collegeOrUniversityName + '\'' +
                '}';
    }
}
