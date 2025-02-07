package com.example.event_management.event_management_service.Model;


import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "participants")
public class EventParticipantsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private UUID clubId;


    public UUID getId(){
        return this.id;
    }
    public void setUserId (UUID userId){
        this.userId = userId;
    }
    public UUID getUserId(){
        return this.userId;
    }

    public void setClubId (UUID clubId){
        this.clubId = clubId;
    }
    public UUID getClubId(){
        return this.clubId;
    }


}
