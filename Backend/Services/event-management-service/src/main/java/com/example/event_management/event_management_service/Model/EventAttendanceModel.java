package com.example.event_management.event_management_service.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "attendance")
public class EventAttendanceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private UUID eventId;
    private UUID userId;

    private String method; // QR or Manual
    private LocalDateTime checkInTime = LocalDateTime.now();

    public void setEventId(UUID eventId) {
        this.eventId = eventId;
    }

    public void setUserId(UUID userId){
        this.userId = userId;
    }

    public void setMethod(String method){
        this.method = method;
    }
    // Constructors, Getters and Setters
}
