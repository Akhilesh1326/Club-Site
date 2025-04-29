package com.example.event_management.event_management_service.Service;

import com.example.event_management.event_management_service.DTO.EventParticipantsDTO;
import com.example.event_management.event_management_service.Model.EventParticipantsModel;
import com.example.event_management.event_management_service.Repo.EventParticipantsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class EventParticipantService {
    private final EventParticipantsRepo eventParticipantsRepo;

    @Autowired
    public EventParticipantService(EventParticipantsRepo eventParticipantsRepo){
        this.eventParticipantsRepo = eventParticipantsRepo;
    }

    public String addNewParticipants(UUID userId, EventParticipantsDTO eventParticipantsDTO) {
        EventParticipantsModel eventParticipantsModel = new EventParticipantsModel();
        eventParticipantsModel.setUserId(userId);
        eventParticipantsModel.setEventId(UUID.fromString(eventParticipantsDTO.getEventId()));
        eventParticipantsModel.setClubId(UUID.fromString(eventParticipantsDTO.getClubId()));

        EventParticipantsModel res = eventParticipantsRepo.save(eventParticipantsModel);
        return "Success";
    }

    public String deleteParticipant(UUID userId) {
        boolean isDelete = eventParticipantsRepo.deleteByUserId(userId);
        if(isDelete){
            return "Success";
        }
        return "Failed";
    }
}
