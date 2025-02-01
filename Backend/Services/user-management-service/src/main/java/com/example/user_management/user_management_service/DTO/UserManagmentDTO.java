package com.example.user_management.user_management_service.DTO;

public class UserManagmentDTO {
    private String name;
    private Long auth_user;
    private String profile_picture_url;


    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

    public void setAuth_user(Long authUser){
        this.auth_user = authUser;
    }
    public Long getAuth_user(){
        return auth_user;
    }

    public void setProfile_picture_url(String profile_picture_url){
        this.profile_picture_url = profile_picture_url;
    }

    public String getProfile_picture_url(){
        return profile_picture_url;
    }

    @Override
    public String toString() {
        return "AuthUserDTO{" +
                "email='" + name + '\'' +
                ", auth_user='" + auth_user + '\'' +
                ", profile_picture_url='" + profile_picture_url + '\'' +
                '}';
    }
}
