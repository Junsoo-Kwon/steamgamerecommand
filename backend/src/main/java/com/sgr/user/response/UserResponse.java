package com.sgr.user.response;

import java.util.List;

import com.sgr.gameinfo.model.Gameinfo;

import io.swagger.annotations.ApiModelProperty;

public class UserResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;
    @ApiModelProperty(value = "data", position = 2)
    public String data;
    @ApiModelProperty(value = "object", position = 3)
    public Object survey;
    public List<Gameinfo> gameinfolist;
}
