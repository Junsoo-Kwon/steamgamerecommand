package com.sgr.gameinfo.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Document(collection="gamehistory")
public class Gamehistory {
    @Id
    private int id;
    private ArrayList<History> history;
}