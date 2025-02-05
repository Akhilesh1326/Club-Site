package com.example.club_management.club_management_service.Model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "clubMembers")
public class ClubMemberModel{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID userId;
    private UUID clubId;

    private Role role;
    private Hirarchy hirarchy;
    public enum Role{
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
        Webmaster

        }
    public enum Hirarchy{

    }
    
}
