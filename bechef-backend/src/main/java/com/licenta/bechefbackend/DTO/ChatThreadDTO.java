package com.licenta.bechefbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChatThreadDTO {
    private String topic;
    private Long initiatorId;
}
