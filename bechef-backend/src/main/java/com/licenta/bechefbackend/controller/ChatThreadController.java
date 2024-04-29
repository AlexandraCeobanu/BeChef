package com.licenta.bechefbackend.controller;

import com.licenta.bechefbackend.DTO.ChatThreadDTO;
import com.licenta.bechefbackend.DTO.ChatThreadResponse;
import com.licenta.bechefbackend.DTO.MessageDTO;
import com.licenta.bechefbackend.DTO.MessageResponse;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.Message;
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

    @PostMapping("/{threadId}/messages")
    public ResponseEntity<?> createMessage(@PathVariable Long threadId, @RequestBody MessageDTO messageDTO)
    {
        try {
            chatThreadService.postMessage(messageDTO);
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
    @GetMapping("/{threadId}/messages")
    public ResponseEntity<?> getAllMessagesByThread(@PathVariable Long threadId)
    {
        try {
            List<MessageResponse> messages = chatThreadService.getMessagesByThread(threadId);
            return ResponseEntity.status(HttpStatus.OK).body(messages);
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @PostMapping("/subscribe/{threadId}")
    public ResponseEntity<?> subscribeThread(@PathVariable Long threadId, @RequestParam Long userId)
    {
        try{
            chatThreadService.subscribeThread(threadId,userId);
            return ResponseEntity.status(HttpStatus.CREATED).body("Subscribed to thread");
        }catch(IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
    @DeleteMapping("/subscribe/{threadId}")
    public ResponseEntity<?> unsubscribeThread(@PathVariable Long threadId, @RequestParam Long userId)
    {
        try{
            chatThreadService.unsubscribeThread(threadId,userId);
            return ResponseEntity.status(HttpStatus.OK).body("Unsubscribed to thread");
        }catch(IllegalStateException e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
