package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.ChatThreadDTO;
import com.licenta.bechefbackend.DTO.ChatThreadResponse;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.services.ChatThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatThreadController {
    @Autowired
    ChatThreadService chatThreadService;
    @PostMapping
    public ResponseEntity<?> createChatThread(@RequestBody ChatThreadDTO chatThread)
    {
        try {
            chatThreadService.postThread(chatThread);
            return ResponseEntity.status(HttpStatus.CREATED).body("thread added");
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @GetMapping
    public ResponseEntity<?> getAllThreads()
    {
        try {
            List<ChatThreadResponse> chatThreadList = chatThreadService.getAllThreads();
            return ResponseEntity.status(HttpStatus.OK).body(chatThreadList);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
