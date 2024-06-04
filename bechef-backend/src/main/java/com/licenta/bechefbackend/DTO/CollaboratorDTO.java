package com.licenta.bechefbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class CollaboratorDTO {
    Long id;
    String email;
    String username;
}
