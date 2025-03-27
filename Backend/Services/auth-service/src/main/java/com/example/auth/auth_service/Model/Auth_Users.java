package com.example.auth.auth_service.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import java.time.LocalDate;
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
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(name = "DOB", nullable = false)
    private LocalDate DOB;

    private String collegeOrUniversityName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String phoneNumber;

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

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;

    @Column(name = "profile_picture_url", nullable = true)
    private String profilePictureUrl;

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.joinedAt = LocalDateTime.now(); // Corrected
    }

    public enum Role {
        Fresher,
        Club_Member,
        Club_President,
        General_Participant,
        Event_Organizer
    }

    // Getters and Setters (Corrected)
    public UUID getUserId() {
        return this.id;
    }

    public String getUserName() {
        return this.userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return this.password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getGoogleId() {
        return this.googleId;
    }
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }
    public void setCreatedAt(LocalDateTime LDT) {
        this.createdAt = LDT;
    }

    public LocalDateTime getJoinedAt() {
        return joinedAt;
    }
    public void setJoinedAt(LocalDateTime joinedAt) {
        this.joinedAt = joinedAt;
    }

    public String getProfilePictureUrl() {
        return this.profilePictureUrl;
    }
    public void setProfilePictureUrl(String PPURL) {
        this.profilePictureUrl = PPURL;
    }

    public Role getRole() {
        return this.role;
    }
    public void setRole(Role role) {
        this.role = role;
    }

    public void setCollegeOrUniversityName(String collegeName) {
        this.collegeOrUniversityName = collegeName;
    }
    public String getCollegeOrUniversityName() {
        return this.collegeOrUniversityName;
    }

    public void setDOB(LocalDate dob) {
        this.DOB = dob;
    }
    public LocalDate getDOB() {
        return this.DOB;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public UUID getId() {
        return this.id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getFirstName() {
        return this.firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getLastName() {
        return this.lastName;
    }
}
