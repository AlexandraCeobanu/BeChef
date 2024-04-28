package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.MessageDTO;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {
    @MessageMapping("/{threadId}/messages")
    @SendTo("{threadId}/newMessage")
    public MessageDTO sendMessage(@DestinationVariable Long threadId, @Payload MessageDTO messageDTO)
    {

        return messageDTO;
    }
}
