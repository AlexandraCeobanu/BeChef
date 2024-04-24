package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MessageDTO {
    private String message;
    private Long senderId;
    private Long threadId;
    public MessageDTO(){

    }
}
