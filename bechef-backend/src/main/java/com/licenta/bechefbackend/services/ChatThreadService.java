package com.licenta.bechefbackend.services;

import com.licenta.bechefbackend.DTO.ChatThreadDTO;
import com.licenta.bechefbackend.DTO.ChatThreadResponse;
import com.licenta.bechefbackend.DTO.MessageDTO;
import com.licenta.bechefbackend.DTO.MessageResponse;
import com.licenta.bechefbackend.entities.ChatThread;
import com.licenta.bechefbackend.entities.Message;
import com.licenta.bechefbackend.entities.User;
import com.licenta.bechefbackend.repository.ChatThreadRepository;
import com.licenta.bechefbackend.repository.MessageRepository;
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
    @Autowired
    MessageRepository messageRepository;
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
            MessageResponse message = new MessageResponse();
            if(nrMessages != 0){
                Message ms = thread.getMessageList().get((int) (nrMessages-1));
                message.setMessage(ms.getMessage());
                message.setSenderId(ms.getSenderUser().getId());
                message.setThreadId(ms.getThread().getId());

            }

            ChatThreadResponse response = new ChatThreadResponse(thread.getId(),thread.getTopic(),
                    thread.getInitiatorUser().getId(),message,nrMessages);
            threadResponses.add(response);
        }
        return threadResponses;
    }

    public void postMessage(MessageDTO messageDTO) {
        User user = userService.getUserById1(messageDTO.getSenderId());
        ChatThread chatThread = chatThreadRepository.findById(messageDTO.getThreadId()).orElse(null);
        Message message = new Message(messageDTO.getMessage(), user, chatThread);
       messageRepository.save(message);
    }

    public List<MessageResponse> getMessagesByThread(Long threadId) {
        ChatThread thread = chatThreadRepository.findById(threadId).orElse(null);
        List<MessageResponse> messageResponseList = new ArrayList<>();
        if(thread != null)
        {
            List<Message> messages = thread.getMessageList();
            for(Message ms : messages)
            {
                MessageResponse msResponse = new MessageResponse(ms.getMessage(),ms.getSenderUser().getId(),ms.getThread().getId());
                messageResponseList.add(msResponse);

            }

            return messageResponseList;
        }
        return null;
    }
}
