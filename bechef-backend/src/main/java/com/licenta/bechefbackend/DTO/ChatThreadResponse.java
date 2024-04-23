package com.licenta.bechefbackend.DTO;

import com.licenta.bechefbackend.entities.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ChatThreadResponse {
    private Long id;
    private String topic;
    private Long initiatorId;
    private Message lastMessage;
    private Long nrMessages;

}
