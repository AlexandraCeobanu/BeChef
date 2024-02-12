package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.UserDTO;
import com.licenta.bechefbackend.entities.User;

public interface AuthenticationService {
    User registerUser(UserDTO userDTO);
}
