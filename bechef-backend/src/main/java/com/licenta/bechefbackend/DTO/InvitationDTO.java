package com.licenta.bechefbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class InvitationDTO {
    private Long id;
    private Long senderId;
    private Long receiverId;
    private String status;
    private Long listId;
}
