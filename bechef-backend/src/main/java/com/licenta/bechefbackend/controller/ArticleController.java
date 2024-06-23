package com.licenta.bechefbackend.controller;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.licenta.bechefbackend.DTO.ArticleDTO;
import com.licenta.bechefbackend.DTO.ExternApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Controller
@RequestMapping("/api/v1/articles")
public class ArticleController {
    private final ObjectMapper objectMapper;
    public ArticleController(ObjectMapper objectMapper)
    {
        this.objectMapper = objectMapper;
    }

    @GetMapping
    public ResponseEntity<?> getArticles() {
        try {

            RestTemplate restTemplate = new RestTemplate();
            String externalApi = "https://newsapi.org/v2/everything?q=\"cooking tips\"&apiKey=74351610d6a64a84bec719b21d60b6f0";


            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer 74351610d6a64a84bec719b21d60b6f0");

            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<ExternApiResponse> response = restTemplate.exchange(
                    externalApi, HttpMethod.GET, entity, ExternApiResponse.class);


            return ResponseEntity.status(HttpStatus.OK).body(response.getBody());
        }
        catch (Exception e)
        {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
    }
}
