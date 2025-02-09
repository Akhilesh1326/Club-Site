package com.example.event_management.event_management_service.DTO;

import com.example.event_management.event_management_service.Model.EventManagementModel;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.UUID;

public class EventManagementDTO {
    private String title;
    private String description;
    private String category;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private String organizerId;
    private String clubId;
    private String registrationRequired;
    private String maxParticipants;

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


    public enum Category{
        Workshop,
        Hackathon,
        Cultural,
        Technical,
        Networking,
        Fun,
        Other
    }
    public void setCategory (String category){
        this.category  = category;
    }

    public String getCategory(){
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

    public void setOrganizerId (String organizerId){
        this.organizerId  =  organizerId;
    }

    public String getOrganizerId() {
        return this.organizerId;
    }


    public void setClubId (String clubId){
        this.clubId = clubId ;
    }

    public String getClubId(){
        return this.clubId;
    }

    public void setRegistrationRequired (String registrationRequired){
        this.registrationRequired  =  registrationRequired;
    }

    public String getRegistrationRequired(){
        return this.registrationRequired;
    }

    public void setMaxParticipants (String maxParticipants){
        this.maxParticipants  =  maxParticipants;
    }

    public String getMaxParticipants(){
        return this.maxParticipants;
    }

}
