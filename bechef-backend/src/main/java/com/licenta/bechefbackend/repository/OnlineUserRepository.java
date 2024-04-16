package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.OnlineUser;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OnlineUserRepository extends CrudRepository<OnlineUser,Long> {

    @Query("select u from OnlineUser u where u.userId = ?1")
    Optional<OnlineUser> findByUserId(Long clientId);

    @Transactional
    @Modifying
    @Query("UPDATE OnlineUser u " + "Set u.sessionId = ?1 WHERE u.id = ?2")
    void updateSessionId(String sessionId,Long id);
}
