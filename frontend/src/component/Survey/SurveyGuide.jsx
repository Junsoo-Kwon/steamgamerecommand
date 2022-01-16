import React from "react";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const SurveyGuide = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="column" spacing={5}>
        <Grid item xs={12}>
          <Typography className={classes.textColorWhite} variant="h5">
            {" "}
            회원님, 좋아하는 게임을 3개이상 선택하세요.
          </Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography
                className={`${classes.textColorWhite} ${classes.textInline}`}
              >
                회원님이 좋아하실 만한 게임을 더 많이 추천해 드릴 수 있습니다.{" "}
                {""}
              </Typography>
              <Typography
                className={`${classes.textColorYellow} ${classes.textInline}`}
              >
                마음에 드는 콘텐츠를 선택하세요
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  textColorWhite: {
    color: "white",
  },
  textColorYellow: {
    color: "yellow",
  },
  textInline: {
    display: "inline",
  },
}));
export default SurveyGuide;
