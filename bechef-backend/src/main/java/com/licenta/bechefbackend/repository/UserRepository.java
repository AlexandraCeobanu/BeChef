package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends CrudRepository<User,Long> {
    @Query("Select u from User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
    @Query("Select u from User u Where u.role = :role")
    Optional<User> findByRole(@Param("role") Role role);
}
