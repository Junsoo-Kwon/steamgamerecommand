import React from "react";
import styled from "styled-components";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

function Infomation({ game, isDone }) {
  const classes = useStyles();

  return (
    <>
      {!isDone && (
        <Container>
          <TitleSection>
            <Typography variant="h6" gutterBottom>
              게임 정보
            </Typography>
            <img
              src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`}
              width="100%"
              alt=""
            />
          </TitleSection>
          <InfoTable>
            <tbody>
              <tr>
                <LeftCell>출시일</LeftCell>
                <RightCell>{game.releaseDate.substr(0, 10)}</RightCell>
              </tr>
              <tr>
                <LeftCell>개발사</LeftCell>
                <RightCell>{game.developer}</RightCell>
              </tr>
              <tr>
                <LeftCell>퍼블리셔</LeftCell>
                <RightCell>{game.publisher}</RightCell>
              </tr>
              <tr>
                <LeftCell>장르</LeftCell>
                <RightCell>{game.genre}</RightCell>
              </tr>
              <tr>
                <LeftCell>언어</LeftCell>
                <RightCell>{game.languages}</RightCell>
              </tr>
            </tbody>
          </InfoTable>
          <Backdrop className={classes.backdrop} open={isDone}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      )}
    </>
  );
}

export default Infomation;

const Container = styled.div`
  min-height: 1px;
  /* margin-left: 20px; */
  background: rgb(25, 29, 45);
  padding: 10px;
  width: 100%;
  /* @media (min-width: 981px) {
    width: 324px;
  } */

  @media (max-width: 1080px) {
    width: 100%;
    margin-bottom: 20px;
    margin-left: 0px;
  }
`;

const TitleSection = styled.div``;

const InfoTable = styled.table`
  border-collapse: separate;
  border-spacing: 2px 5px;
  text-align: center;
  width: 100%;
`;

const LeftCell = styled.td`
  padding: 5px 10px;
  background: rgb(34, 58, 76);
  min-width: 65px;
`;

const RightCell = styled.td`
  padding: 5px 10px;
  background: rgb(34, 58, 76);
`;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
