package com.example.club_management.club_management_service.Model;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.UUID;

@Document(collection = "clubMembers")
public class ClubMemberModel {

    @Id
    private String id;

    @Field("userId")
    private UUID userId;

    @Field("clubId")
    private UUID clubId;

    @Field("role")
    @Enumerated(EnumType.STRING)
    private Role role;

    private String hierarchy;

    // Enums
    public enum Role {
        President,
        VicePresident,
        Secretary,
        Treasurer,

        Event_Coordinator,
        Public_Relations_Officer,
        Marketing_Head,
        Sponsorship_Coordinator,

        Technical_Lead,
        Content_Writer,
        Design_Head,
        Webmaster,

        Membership_Coordinator,
        Community_Manager,
        Volunteer_Coordinator,

        Research_Head,
        Sports_Coordinator,
        Cultural_Head
    }

    public enum Hierarchy {
        Core_Positions,
        Management_Event_Specific_Roles,
        Technical_Creative_Roles,
        Membership_Outreach_Roles,
        Specialized_Roles
    }

    // Constructors
    public ClubMemberModel() {}


    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getClubId() {
        return clubId;
    }

    public void setClubId(UUID clubId) {
        this.clubId = clubId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getHierarchy() {
        return hierarchy;
    }

    public void setHierarchy(String hierarchy) {
        this.hierarchy = hierarchy;
    }
}