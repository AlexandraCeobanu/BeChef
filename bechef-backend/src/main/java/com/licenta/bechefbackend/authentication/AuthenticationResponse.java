package com.licenta.bechefbackend.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private String userUsername;
    private Long nrLikes;
    private Long nrRecipes;
    private Long id;
}
