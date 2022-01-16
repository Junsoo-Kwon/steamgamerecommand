import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const SurveyButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={props.onClick}
    >
      {props.value}
    </Button>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#2d7096",
    padding: "16px",
    paddingLeft: "64px",
    paddingRight: "64px",
    color: "white",
    fontSize: "16px",
  },
}));

export default SurveyButton;
