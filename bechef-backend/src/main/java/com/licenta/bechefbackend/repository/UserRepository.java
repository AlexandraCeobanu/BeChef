package com.licenta.bechefbackend.repository;

import com.licenta.bechefbackend.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository  extends CrudRepository<User,Long> {
}
