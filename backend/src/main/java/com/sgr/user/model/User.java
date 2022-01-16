package com.sgr.user.model;

import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Document(collection="users")
public class User {
    @NotNull
    @Id
    private String _id;
    private boolean is_survey;
    private int[] survey_game_id;
    private Object popularTags;

}
