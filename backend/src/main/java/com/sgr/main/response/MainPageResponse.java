package com.sgr.main.response;

import java.util.List;

import com.sgr.gameinfo.model.Gameinfo;

import io.swagger.annotations.ApiModelProperty;

public class MainPageResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;
    @ApiModelProperty(value = "data", position = 2)
    public String data;
    @ApiModelProperty(value = "object", position = 3)
    public List<Gameinfo> recentGames;
    public List<Gameinfo> popularGames;
    public List<Gameinfo> mostplayedGames;

}
