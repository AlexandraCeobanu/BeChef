package com.licenta.bechefbackend.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ThreadResponseDTO {
    Long id;
    Long initiatorId;
    String topic;
}
