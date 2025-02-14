package com.example.user_management.user_management_service.DTO;

import com.example.user_management.user_management_service.Model.Users;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public class UserManagmentDTO {
    private String firstName;
    private String lastName;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate DOB;
    private String collegeOrUniversityName;
    private String role;
    private String phoneNumber;
    private String profile_picture_url;


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


    @Override
    public String toString() {
        return "AuthUserDTO{" +
                "firstName='" + firstName + '\'' +
                "lastName='" + lastName + '\'' +
                "role='" + role + '\'' +
                "DOB='" + DOB + '\'' +
                "phone='" + phoneNumber + '\'' +
                "Clg or uni='" + collegeOrUniversityName + '\'' +
                ", profile_picture_url='" + profile_picture_url + '\'' +
                '}';
    }
}
