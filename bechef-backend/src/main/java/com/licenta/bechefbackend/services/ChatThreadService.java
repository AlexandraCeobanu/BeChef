package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ChatThreadDTO;
import com.licenta.bechefbackend.DTO.ChatThreadResponse;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.Message;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.ChatThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatThreadService {
    @Autowired
    ChatThreadRepository chatThreadRepository;
    @Autowired
    UserService userService;
    public void postThread(ChatThreadDTO chatThreadDTO) {
        User user = userService.getUserById1(chatThreadDTO.getInitiatorId());
        ChatThread chatThread = new ChatThread(chatThreadDTO.getTopic(),user);
        chatThreadRepository.save(chatThread);
    }

    public List<ChatThreadResponse> getAllThreads() {
        List<ChatThread> threadList = (List<ChatThread>) chatThreadRepository.findAll();
        List<ChatThreadResponse> threadResponses = new ArrayList<>();
        for(ChatThread thread : threadList)
        {
            List<Message> messages = thread.getMessageList();
            Long nrMessages = Long.valueOf(messages.size());
            Message message;
            if(nrMessages != 0){
             message = thread.getMessageList().get((int) (nrMessages-1));}
            else
            message = null;

            ChatThreadResponse response = new ChatThreadResponse(thread.getId(),thread.getTopic(),
                    thread.getInitiatorUser().getId(),message,nrMessages);
            threadResponses.add(response);
        }
        return threadResponses;
    }
}
