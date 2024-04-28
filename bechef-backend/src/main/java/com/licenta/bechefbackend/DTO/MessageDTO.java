package com.licenta.bechefbackend.DTO;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.licenta.bechefbackend.entities.Message;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
@JsonSerialize
@JsonDeserialize
public class MessageDTO {
    private String message;
    private Long senderId;
    private Long threadId;
    public MessageDTO(){

    }
}
