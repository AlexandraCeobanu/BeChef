package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.OnlineUser;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OnlineUserRepository extends CrudRepository<OnlineUser,Long> {

    @Query("select u from OnlineUser u where u.userId = ?1")
    Optional<OnlineUser> findByUserId(Long clientId);
}
