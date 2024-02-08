package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository  extends CrudRepository<User,Long> {
    @Query("Select u from User u WHERE u.email = :email")
    User findByEmail(@Param("email") String email);
}
