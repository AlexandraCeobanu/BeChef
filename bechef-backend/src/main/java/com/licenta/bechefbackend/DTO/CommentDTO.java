package com.licenta.bechefbackend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDTO {
    private String comm;
    private Long senderId;
    private Long receiverId;
    private Long recipeId;
}
