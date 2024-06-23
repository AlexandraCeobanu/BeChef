package com.licenta.bechefbackend.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@JsonSerialize
@JsonDeserialize
@ToString
public class ExternApiResponse {
    String status;
    String totalResults;
    @JsonProperty
    List<ArticleDTO> articles;
}
