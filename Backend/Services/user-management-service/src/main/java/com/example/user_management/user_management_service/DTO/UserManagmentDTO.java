package com.example.user_management.user_management_service.DTO;

import com.example.user_management.user_management_service.Model.Users;

import java.time.LocalDate;

public class UserManagmentDTO {
    private String profile_picture_url;
    private String firstName;
    private String lastName;
    private LocalDate DOB;
    private String CollegeOrUniversityName;
    private String role;
    private Number phoneNumber;
    private String profilePictureUrl;


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

    public Number getPhoneNumber(){
        return this.phoneNumber;
    }

    public LocalDate getDOB(){
        return this.DOB;
    }

    public String getCollegeOrUniversityName(){
        return this.CollegeOrUniversityName;
    }


    @Override
    public String toString() {
        return "AuthUserDTO{" +
                "firstName='" + firstName + '\'' +
                "lastName='" + lastName + '\'' +
                "role='" + role + '\'' +
                "DOB='" + DOB + '\'' +
                "phone='" + phoneNumber + '\'' +
                "Clg or uni='" + CollegeOrUniversityName + '\'' +
                ", profile_picture_url='" + profile_picture_url + '\'' +
                '}';
    }
}
