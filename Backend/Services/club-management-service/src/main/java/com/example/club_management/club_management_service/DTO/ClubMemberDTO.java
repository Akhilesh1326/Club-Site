package com.example.club_management.club_management_service.DTO;

import com.example.club_management.club_management_service.Model.ClubMemberModel;

import java.util.UUID;

public class ClubMemberDTO {
    private UUID userId;
    private UUID clubId;
    private String role;
    private String hierarchy;

    public UUID getUserId(){
        return this.userId;
    }
    public void setUserId(UUID userId){
        this.userId = userId;
    }

    public UUID getClubId(){
        return this.clubId;
    }
    public void setClubId(UUID  clubId){
        this.clubId = clubId;
    }

    public String getRole(){
        return this.role;
    }
    public void setRole(){
        this.role = role;
    }

    public String getHierarchy(){
        return this.hierarchy;
    }
    public void setHierarchy(){
        this.hierarchy = hierarchy;
    }
}
