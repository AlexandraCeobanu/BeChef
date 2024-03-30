package com.licenta.bechefbackend.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LikeDTO {
   private Long likerId;
   private Long likedId;
   private Long recipeId;
}
