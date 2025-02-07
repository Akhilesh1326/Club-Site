package com.example.event_management.event_management_service.Repo;

import com.example.event_management.event_management_service.Model.EventParticipantsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface EventParticipantsRepo extends JpaRepository<EventParticipantsModel, UUID> {

}