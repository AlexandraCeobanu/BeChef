package com.licenta.bechefbackend.DTO;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ArticleDTO {
    Source source;
    String author;
    String title;
    String description;
    String url;
    String urlToImage;
    String publishedAt;
    String content;

    public ArticleDTO(String sourceId,String sourceName, String author, String title, String description, String url, String urlToImage,String publishedAt, String content){
        this.source = new Source(sourceId, sourceName);
        this.author = author;
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
        this.content = content;
    }
    @JsonSerialize
    @JsonDeserialize
    @Getter
    @Setter
    public static class Source {
        private String id;
        private String name;

        public Source(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }
}
