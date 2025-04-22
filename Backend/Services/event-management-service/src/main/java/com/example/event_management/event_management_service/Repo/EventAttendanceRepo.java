package com.example.event_management.event_management_service.Repo;

import com.example.event_management.event_management_service.Model.EventAttendanceModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface EventAttendanceRepo extends JpaRepository<EventAttendanceModel, UUID> {
    Optional<EventAttendanceModel> findByEventIdAndUserId(UUID eventId, UUID userId);
}
