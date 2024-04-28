package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.MessageDTO;
import com.licenta.bechefbackend.DTO.MessageResponse;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @MessageMapping("/messages")
    @SendTo("/newMessage")
    public MessageResponse sendMessage(@Payload MessageDTO messageDTO)
    {

        MessageResponse msResponse = new MessageResponse(messageDTO.getMessage(), messageDTO.getSenderId(),
                messageDTO.getThreadId());


    return msResponse;

    }
}
