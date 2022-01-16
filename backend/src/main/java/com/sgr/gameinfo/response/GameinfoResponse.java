package com.sgr.gameinfo.response;

import java.util.ArrayList;

import com.sgr.gameinfo.model.Gameinfo;
import com.sgr.gameinfo.model.History;

import org.springframework.data.domain.Page;

import io.swagger.annotations.ApiModelProperty;

public class GameinfoResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;
    @ApiModelProperty(value = "data", position = 2)
    public String data;
    @ApiModelProperty(value = "object", required = false)
    public ArrayList<History> gamehistory;
    @ApiModelProperty(required = false)
    public Page<Gameinfo> gameinfo;
}
