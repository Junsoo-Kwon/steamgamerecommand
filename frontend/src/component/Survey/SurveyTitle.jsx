import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
const SurveyTitle = (props) => {
  const classes = useStyles();
  return (
    <Typography className={classes.text} variant="h5">
      {" "}
      {props.value}{" "}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  text: {
    color: "white",
    paddingLeft: theme.spacing(8),
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export default SurveyTitle;
