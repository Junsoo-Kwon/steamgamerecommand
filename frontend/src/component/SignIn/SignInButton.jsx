import React from "react";
import { makeStyles, Button } from "@material-ui/core";

const SignInButton = (props) => {
  const classes = useStyles();

  return (
    <Button
      fullWidth
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
    borderRadius: "75px",
    color: "white",
  },
}));

export default SignInButton;
