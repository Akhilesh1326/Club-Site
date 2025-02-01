package com.example.auth.auth_service.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "auth_users")
public class Auth_Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column
    private String googleId;


    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate(){
        this.createdAt = LocalDateTime.now();
    }
    public enum Role{
        Fresher,
        Club_Member,
        Club_Leader,
        General_Participant,
        Event_Organizer,
        Ambassadors,
        Mentors
    }

    public long getUserId(){
        return this.id;
    }

    public String getPassword(){ return this.password; }
    public void setPassword(String password){ this.password = password; }

    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public Role getRole(){
        return this.role;
    }
    public void setRole(Role role){
        this.role = role;
    }

    public String getGoogleId(){
        return this.googleId;
    }
    public void setGoogleId(String googleId){
        this.googleId = googleId;
    }


    public LocalDateTime getCreatedAt(){
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime LDT){
        this.createdAt = LDT;
    }

}

