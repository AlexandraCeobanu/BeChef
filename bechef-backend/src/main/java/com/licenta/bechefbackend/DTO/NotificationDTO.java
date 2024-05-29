package com.licenta.bechefbackend.DTO;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class NotificationDTO {
    Long senderId;
    Long receiverId;
    Long recipeId;
    Long threadId;
    Long stockItemId;
    String message;
    Boolean read;
    String type;

    @Override
    public String toString() {
        return "NotificationDTO{" +
                "senderId=" + senderId +
                ", receiverId=" + receiverId +
                ", recipeId=" + recipeId +
                ", message='" + message + '\'' +
                ", read=" + read +
                '}';
    }

    public void setThreadId(Long threadId) {
        this.threadId = threadId;
    }

    public Long getThreadId() {
        return threadId;
    }
}
