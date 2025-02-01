package com.example.club_management.club_management_service.Model;

import jakarta.persistence.*;
import org.hibernate.mapping.List;

import java.time.LocalDateTime;

@Entity
@Table(name = "clubs")
public class ClubModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
    private String description;
    private String logoUrl;
    private String bannerUrl;
    @Column(nullable = false, unique = true)
    private Category category;
    @Column(nullable = false, unique = false)
    private String college;
    @Column(nullable = false)
    private Visibility visibility;
    private String founderEmail; // getting from the DB table directly
    @Column(nullable = true)
    private String clubEmail;
    private String socialLinks; // Yet to implement

    @Column(nullable = false, updatable = false)
    private LocalDateTime clubCreatedAt;

    @PrePersist
    public void onClubCreate(){this.clubCreatedAt = LocalDateTime.now();};

    public void setName(String name){
        this.name = name;
    }
    public String getName(){
        return this.name;
    }

    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return this.description;
    }

    public void setLogoUrl(String logoUrl){
        this.logoUrl = logoUrl;
    }
    public String getLogoUrl(){
        return this.logoUrl;
    }

    public void setBannerUrl(String bannerUrl){
        this.bannerUrl = bannerUrl;
    }
    public String getBannerUrl(){
        return this.bannerUrl;
    }

    public enum Category{
        Technical,
        Cultural,
        Sports,
        Literary,
        Social,
        Service,
    }

    public Category getCategory() {
        return category;
    }
    public void setCategory(Category category){
        this.category = category;
    }

    public void setCollege(String college){
        this.college = college;
    }
    public String getCollege(){
        return this.college;
    }

    public enum Visibility {
        Public,
        Private
    }
    public void setVisibility(Visibility visibility)
    {
        this.visibility = visibility;
    };
    public Visibility getVisibility()
    {
        return this.visibility;
    };

    public void setClubEmail(String clubEmail){
        this.clubEmail = clubEmail;
    };
    public String getClubEmail(){
        return this.clubEmail;
    }

    public void setFounderEmail(String founderEmail){
        this.founderEmail = founderEmail;
    }
    public String getFounderEmail(){
        return this.founderEmail = founderEmail;
    }
}

