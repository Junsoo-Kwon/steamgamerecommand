package com.sgr.gameinfo.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
@Document(collection="gameinfo")
public class Gameinfo {
	@Id
	private int id;
	private String url;
	private String name;
	private String descSnippet;
	private int recentReviewsCount;
	private int recentReviewsPercent;
	private int allReviewsCount;
	private int allReviewsPercent;
	private Date releaseDate;
	private String developer;
	private String publisher;
	private String popularTags;
	private String gameDetails;
	private String languages;
	private String achievements;
	private String genre;
	private String gameDescription;
	private String matureContent;
	private String minimumRequirements;
	private String recommendedRequirements;
	private String originalPrice;
	private float price;
	@Override
	public String toString() {
		return "Gameinfo [Id=" + id + ", name=" + name + "]";
	}
}