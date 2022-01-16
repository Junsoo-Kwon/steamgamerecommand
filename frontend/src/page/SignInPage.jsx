import React from "react";
import styled from "styled-components";
import { Typography, Grid, makeStyles } from "@material-ui/core";

import logoimg from "assets/img/logo.png";
import steamlogoimg from "assets/img/steamlogo.png";
import { SignInButton } from "component";

const SignInPage = () => {
  const classes = useStyles();

  const onClickSignInHandler = (e) => {
    if (typeof window !== "undefined") {
      /* 개발 */
      // window.location.href = "http://localhost:5000/auth/steam";
      /* 배포 */
      window.location.href = "http://j3b305.p.ssafy.io:5000/auth/steam";
    }
  };
  return (
    <SignInContainer>
      <SubContainer>
        <Grid container className={classes.paper}>
          <Grid item xs={12}>
            <Grid container spacing={5}>
              <Grid item xs={4}>
                <div className={classes.imageAlign}>
                  <LogoImage src={logoimg} />
                </div>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.plusText}>+</Typography>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.imageAlign}>
                  <LogoImage src={steamlogoimg} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.guide}>
              Steam 계정과 연동하여 로그인을 하면 추가 기능을 이용할 수
              있습니다. <br />
              더 나은 서비스를 제공하기 위해 Steam Web API에서
              <br /> 계정에 대한 공개 정보를 가져옵니다.
              <br />
              <br /> 이 웹 서비스는 Steam과 관련이 없습니다. <br />
              언제든지 계정과 모든 데이터를 삭제할 수 있습니다.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.btnBox}>
            <SignInButtonContainer>
              <SignInButton
                value="STEAM을 통한 로그인"
                onClick={onClickSignInHandler}
              />
            </SignInButtonContainer>
          </Grid>
        </Grid>
      </SubContainer>
    </SignInContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  guide: {
    marginTop: theme.spacing(10),
    color: "white",
    fontSize: "20px",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "70px",
  },
  imageAlign: {
    paddingTop: theme.spacing(1),
  },
  plusText: {
    color: "white",
    fontSize: "65px",
    textAlign: "center",
    lineHeight: "112px",
  },
  btnBox: {
    width: "100%",
  },
}));

const SignInContainer = styled.div`
  background: rgb(26, 40, 56);
  height: 100vh;
`;

const SubContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: auto;
  position: relative;
  & > * {
    margin-top: 20px;
  }

  @media (max-width: 550px) {
    width: auto;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 40px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
`;

const SignInButtonContainer = styled.div`
  margin-top: 48px;

  & .MuiButtonBase-root {
    font-size: 18px;
    font-weight: 700;
    width: 100%;
  }
`;

export default SignInPage;
