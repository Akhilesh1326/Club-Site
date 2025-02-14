package com.example.user_management.user_management_service.Model;


import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
public class Users {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;


    @Column(nullable = false)
    private LocalDate DOB;

    private String collegeOrUniversityName;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String phoneNumber;

    @Column(name = "joined_at", nullable = false)
    private LocalDateTime joinedAt;


    @Column(name = "profile_picture_url", nullable = true)
    private String profilePictureUrl;




    @PrePersist
    protected void onJoin(){
        this.joinedAt = LocalDateTime.now();
    }

    public enum Role{
        Fresher,
        Club_Member,
        Club_President,
        General_Participant,
        Event_Organizer,
    }

    public void setRole(Role role) {
        this.role = role;
    }
    public Role getRole() {
        return this.role;
    }

    public void setCollegeName(String collegeName) {
        this.collegeOrUniversityName = collegeName;
    }
    public String getCollegeName(){
        return this.collegeOrUniversityName;
    }

    public void setDOB(LocalDate DOB) {
        this.DOB = DOB;
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


    public UUID getId(){
        return this.id;
    }
    public void setId(UUID id){
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

    public String getProfilePictureUrl(){
        return this.profilePictureUrl;
    }
    public void setProfilePictureUrl(String PPURL){
        this.profilePictureUrl = PPURL;
    }

}
