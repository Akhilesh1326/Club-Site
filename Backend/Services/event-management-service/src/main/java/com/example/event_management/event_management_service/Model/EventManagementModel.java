package com.example.event_management.event_management_service.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;


@Entity
@Table(name="events")
public class EventManagementModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    private String location;

    @Column(nullable = false)
    private UUID organizerId;

    @Column(nullable = false)
    private UUID clubId;

    @Column(nullable = false)
    private Boolean registrationRequired;

    private Integer maxParticipants;

    private EventType eventType;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt =  LocalDateTime.now();

    @PreUpdate
    public void setUpdatedAt(){
        this.updatedAt = LocalDateTime.now();
    }


    public void setId(UUID id){
        this.id = id;
    }
    public UUID getId(){
        return this.id;
    }

    public void setTitle (String title){
        this.title  = title;
    }

    public String getTitle(){
        return this.title;
    }

    public void setDescription (String description){
        this.description  = description;
    }

    public String getDescription(){
        return this.description;
    }

    public enum EventType{
        Collage_Level,
        Global_Level
    }

    public enum Category{
        Workshop,
        Hackathon,
        Cultural,
        Technical,
        Networking,
        Fun,
        Other
    }
    public void setCategory (Category category){
        this.category  = category;
    }

    public Category getCategory(){
        return this.category;
    }

    public void setStartTime (LocalDateTime startTime){
        this.startTime  = startTime;
    }

    public LocalDateTime getStartTime(){
        return this.startTime;
    }

    public void setEndTime (LocalDateTime endTime){
        this.endTime  =  endTime;
    }

    public LocalDateTime getEndTime(){
        return this.endTime;
    }

    public void setLocation (String location){
        this.location  =  location;
    }

    public String getLocation(){
        return this.location;
    }

    public void setOrganizerId (UUID organizerId){
        this.organizerId  =  organizerId;
    }

    public UUID getOrganizerId() {
        return this.organizerId;
    }


    public void setClubId (UUID clubId){
        this.clubId = clubId ;
    }

    public UUID getClubId(){
        return this.clubId;
    }

    public void setRegistrationRequired (Boolean registrationRequired){
        this.registrationRequired  =  registrationRequired;
    }

    public Boolean getRegistrationRequired(){
        return this.registrationRequired;
    }

    public void setMaxParticipants (Integer maxParticipants){
        this.maxParticipants  =  maxParticipants;
    }

    public Integer getMaxParticipants(){
        return this.maxParticipants;
    }

    public void setEventType(EventType eventType){
        this.eventType = eventType;
    }



}
