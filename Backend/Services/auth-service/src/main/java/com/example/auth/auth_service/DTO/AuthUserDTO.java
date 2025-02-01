package com.example.auth.auth_service.DTO;

public class AuthUserDTO {

    private String name;
    private String profile_picture_url;
    private String email;
    private String password;
    private String role; // Role is a String, to be converted to Enum in the service layer


    // Getters and Setters

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }


    public void setProfile_picture_url(String profile_picture_url){
        this.profile_picture_url = profile_picture_url;
    }

    public String getProfile_picture_url(){
        return profile_picture_url;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    @Override
    public String toString() {
        return "AuthUserDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
