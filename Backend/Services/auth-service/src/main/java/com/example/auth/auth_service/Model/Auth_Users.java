package com.example.auth.auth_service.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "auth_users")
public class Auth_Users {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "UUID")
    private UUID id;


    @Column(nullable = false)
    private String userName;


    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;


    @Column
    private String googleId;


    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void onCreate(){
        this.createdAt = LocalDateTime.now();
    }

    public UUID getUserId(){return this.id;}


    public String getUserName(){return this.userName;}
    public void setUserName(String userName){this.userName = userName;}

    public String getPassword(){ return this.password; }
    public void setPassword(String password){ this.password = password; }

    public String getEmail(){
        return this.email;
    }
    public void setEmail(String email){
        this.email = email;
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

