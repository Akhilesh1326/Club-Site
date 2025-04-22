package com.example.event_management.event_management_service.Service;

import com.example.event_management.event_management_service.Model.EventAttendanceModel;
import com.example.event_management.event_management_service.Repo.EventAttendanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class EventAttendanceService {

    @Autowired
    private EventAttendanceRepo eventAttendanceRepo;

    public String checkIn(UUID eventId, UUID userId, String method) {
        Optional<EventAttendanceModel> existing = eventAttendanceRepo.findByEventIdAndUserId(eventId, userId);
        if (existing.isPresent()) {
            return "User already checked in";
        }

        EventAttendanceModel attendance = new EventAttendanceModel();
        attendance.setEventId(eventId);
        attendance.setUserId(userId);
        attendance.setMethod(method);

        eventAttendanceRepo.save(attendance);
        return "Check-in successful";
    }
}
