package com.example.club_management.club_management_service.Model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.mapping.List;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "clubs")
public class ClubModel {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(columnDefinition = "UUID")
    private UUID id;
    private UUID userId;

    @Column(nullable = false, unique = true)
    private String clubName;

    private String clubDescription;

    private String clubLogoUrl;

    private String clubBannerUrl;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false, unique = false)
    private String collegeOfClub;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Visibility clubVisibility;

    private String clubFounderEmail;

    private String clubCity;

    private String clubState;

    @Column(nullable = true)
    private String clubEmail;
    private String socialLinks; // Yet to implement

    @Column(nullable = false, updatable = false)
    private LocalDateTime clubCreatedAt;

    @PrePersist
    public void onClubCreate(){this.clubCreatedAt = LocalDateTime.now();};

    public UUID getId(){
        return this.id;
    }

    public void setUserId(UUID userId){
        this.userId = userId;
    }
    public UUID getUserId(){
        return this.userId;
    }

    public void setName(String name){
        this.clubName = name;
    }
    public String getName(){
        return this.clubName;
    }

    public void setDescription(String description){
        this.clubDescription = description;
    }
    public String getDescription(){
        return this.clubDescription;
    }

    public void setLogoUrl(String logoUrl){
        this.clubLogoUrl = logoUrl;
    }
    public String getLogoUrl(){
        return this.clubLogoUrl;
    }

    public void setBannerUrl(String bannerUrl){
        this.clubBannerUrl = bannerUrl;
    }
    public String getBannerUrl(){
        return this.clubBannerUrl;
    }

    public enum Category{
        Technical,
        Cultural,
        Sports,
        Literary,
        Social,
        Service,
        Environment,
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category){
        this.category = category;
    }

    public void setCollege(String college){
        this.collegeOfClub = college;
    }
    public String getCollege(){
        return this.collegeOfClub;
    }

    public enum Visibility {
        Public,
        Private
    }

    public void setVisibility(Visibility visibility)
    {
        this.clubVisibility = visibility;
    };
    public Visibility getVisibility()
    {
        return this.clubVisibility;
    };

    public void setClubEmail(String clubEmail){
        this.clubEmail = clubEmail;
    };
    public String getClubEmail(){
        return this.clubEmail;
    }

    public void setFounderEmail(String founderEmail){
        this.clubFounderEmail = founderEmail;
    }
    public String getFounderEmail(){
        return this.clubFounderEmail;
    }


    public void setClubCity(String clubCity){
        this.clubCity = clubCity;
    }
    public String getClubCity(){
        return this.clubCity;
    }

    public void setClubState(String clubState){
        this.clubState = clubState;
    }
    public String getClubState(){
        return this.clubState;
    }
}

