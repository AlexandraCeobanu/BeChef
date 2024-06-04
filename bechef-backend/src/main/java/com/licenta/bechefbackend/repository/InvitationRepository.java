package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Invitation;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvitationRepository extends CrudRepository<Invitation,Long> {
@Query("SELECT i FROM Invitation i where i.sender.id =?1 and i.receiver.id =?2 and i.list.id =?3 and i.status = 'Pending'")
    Optional<Invitation> findByAll(Long senderId, Long receiverId, Long listId);
@Query("SELECT i from Invitation i where i.list.id =?1")
    List<Invitation> findAllByListId(Long id);
}
