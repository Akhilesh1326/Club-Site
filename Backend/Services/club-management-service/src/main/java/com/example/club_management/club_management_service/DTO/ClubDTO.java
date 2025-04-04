package com.example.club_management.club_management_service.DTO;

import java.util.UUID;

public class ClubDTO {
    private String name;
    private String description;
    private String logoUrl;
    private String bannerUrl;
    private String category;
    private String college;
    private String visibility;
    private String founderEmail;
    private String clubEmail;
    private String clubCity;
    private String clubState;


    public String getClubCity(){
        return this.clubCity;
    }
    public String getClubState(){
        return this.clubState;
    }

    public void setName (String name){

        this.name = name;
    }
    public String getName (){

        return this.name;
    }

    public void setDescription (String description){
        this.description = description;
    }
    public String getDescription (){

        return this.description;
    }

    public void setLogoUrl (String logoUrl){
        this.logoUrl = logoUrl;
    }
    public String getLogoUrl (){
        return this.logoUrl;
    }

    public void setBannerUrl (String bannerUrl){
        this.bannerUrl = bannerUrl;
    }
    public String getBannerUrl (){
        return this.bannerUrl;
    }

    public void setCategory (String category){
        this.category = category;
    }
    public String getCategory (){
        return this.category;
    }

    public void setCollege (String college){
        this.college = college;
    }
    public String getCollege (){
        return this.college;
    }

    public void setVisibility (String visibility){
        this.visibility = visibility;
    }
    public String getVisibility (){
        return this.visibility;
    }

    public void setFounderEmail (String founderEmail){
        this.founderEmail = founderEmail;
    }
    public String getFounderEmail (){
        return this.founderEmail;
    }

    public void setClubEmail (String clubEmail){
        this.clubEmail = clubEmail;
    }
    public String getClubEmail (){
        return this.clubEmail;
    }

}




