package com.example.event_management.event_management_service.DTO;


public class EventParticipantsDTO {
    private String userId;
    private String clubId;

    public void setUserId (String userId){
        this.userId = userId;
    }
    public String getUserId(){
        return this.userId;
    }

    public void setClubId (String clubId){
        this.clubId = clubId;
    }
    public String getClubId(){
        return this.clubId;
    }
}
