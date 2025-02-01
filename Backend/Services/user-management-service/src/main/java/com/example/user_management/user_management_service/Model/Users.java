package com.example.user_management.user_management_service.Model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;
    
    @Column(name = "auth_user_id", nullable = false)
    private Long authUser;

    @Column(name = "profile_picture_url", nullable = true)
    private String profilePictureUrl;

    @PrePersist
    protected void onJoin(){
        this.joinedAt = LocalDateTime.now();
    }

    public String getName(){
        return this.name;
    }
    public void setName(String name){
        this.name = name;
    }

    public Long getId(){
        return this.id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public Long getAuthUser() {
        return authUser;
    }

    public void setAuthUser(Long authUser) {
        this.authUser = authUser;
    }

    public String getProfilePictureUrl(){
        return this.profilePictureUrl;
    }
    public void setProfilePictureUrl(String PPURL){
        this.profilePictureUrl = PPURL;
    }

}
