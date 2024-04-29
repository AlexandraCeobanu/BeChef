package com.licenta.bechefbackend.DTO;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonDeserialize
@JsonSerialize
public class LikeDTO {
   private Long likerId;
   private Long likedId;
   private Long recipeId;
}
