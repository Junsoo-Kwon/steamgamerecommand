package com.sgr.surveygamelist.model;


import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Document(collection="surveygamelist")
public class SurveyGameList {
	@Id
	private int id;
	private String url;
	private String name;
	private String desc_snippet;
	private int recent_reviews_count;
	private int recent_reviews_percent;
	private int all_reviews_count;
	private int all_reviews_percent;
	private Date release_date;
	private String developer;
	private String publisher;
	private String popular_tags;
	private String game_details;
	private String languages;
	private String achievements;
	private String genre;
	private String game_description;
	private String mature_dontent;
	private String minimum_requirements;
	private String recommended_requirements;
	private String original_price;
	@Override
	public String toString() {
		return "Gameinfo [Id=" + id + ", name=" + name + "]";
	}
}