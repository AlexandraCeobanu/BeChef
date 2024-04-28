package com.licenta.bechefbackend.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MessageResponse {
    String message;
    Long senderId;
    Long threadId;

   /* public MessageResponse() {

    }*/

}
