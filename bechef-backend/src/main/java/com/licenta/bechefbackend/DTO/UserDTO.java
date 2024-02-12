package com.licenta.bechefbackend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    String email;
    String username;
    String password;
    public UserDTO(String username,String email,String password)
    {
        this.username = username;
        this.email = email;
        this.password = password;
    }

}
