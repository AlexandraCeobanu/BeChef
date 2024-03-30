package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entities.Role;
import com.licenta.bechefbackend.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
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
    @Query("Select u from User u WHERE u.userUsername = :username")
    Optional<User> findByUserUsername(@Param("username") String username);
    @Transactional
    @Modifying
    @Query("UPDATE User a " + "SET a.password = ?1 WHERE a.email = ?2")
    int changePassword(String password,String email);
    @Transactional
    @Modifying
    @Query("UPDATE User a " + "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableUser(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User a " + "SET a.profilePicture = ?1 WHERE a.userUsername = ?2")
    int updateProfilePicture(String profilePicture,String username);

    @Transactional
    @Modifying
    @Query("UPDATE User a " + "SET a.nrRecipes = ?1 WHERE a.id = ?2")
    int updateNrRecipes(Long recipes,Long id);

    @Transactional
    @Modifying
    @Query("UPDATE User a " + "SET a.nrLikes = ?1 WHERE a.id = ?2")
    int updateNrLikes(Long nrLikes,Long id);
}
