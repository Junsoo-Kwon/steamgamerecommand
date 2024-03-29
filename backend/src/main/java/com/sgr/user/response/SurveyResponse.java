package com.sgr.user.response;

import io.swagger.annotations.ApiModelProperty;

public class SurveyResponse {
    @ApiModelProperty(value = "status", position = 1)
    public boolean status;
    @ApiModelProperty(value = "data", position = 2)
    public String data;
    @ApiModelProperty(value = "object", position = 3)
    public Object survey;
}
