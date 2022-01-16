import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

function TableSection({ recentGames, mostplayedGames }) {
  const classes = useStyles();

  return (
    <Grid container spacing={5}>
      <Grid item sm={6} xs={12}>
        <TalbeBox>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "27%" }} />
            <col style={{ width: "28%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <thead>
            <tr>
              <ThCell colSpan="2" className={classes.tableTitle}>
                출시예정인 게임
              </ThCell>
              <ThCell className={classes.talbeSubTitle}>출시일</ThCell>
              <ThCell className={classes.talbeSubTitle}>장르</ThCell>
            </tr>
          </thead>
          <tbody>
            {recentGames.map((game) => (
              <tr className={classes.trHover} key={game.id}>
                <TdCell>
                  <Link to={`/info/${game.id}`}>
                    <img
                      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`}
                      className={classes.gameImage}
                      alt=""
                    />
                  </Link>
                </TdCell>
                <TdCellWhite>
                  <Link to={`/info/${game.id}`} className={classes.linkText}>
                    <GameNameCell>{game.name}</GameNameCell>
                  </Link>
                </TdCellWhite>
                <TdCellGreen>{game.releaseDate.substr(0, 10)}</TdCellGreen>
                <TdCellWhite>
                  <GameNameCell>{game.popularTags.split(",")[0]}</GameNameCell>
                </TdCellWhite>
              </tr>
            ))}
          </tbody>
        </TalbeBox>
      </Grid>
      <Grid item sm={6} xs={12}>
        <TalbeBox>
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "30%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <thead>
            <tr>
              <ThCell colSpan="2" className={classes.tableTitle}>
                가장 많이 플레이한 게임
              </ThCell>
              <ThCell className={classes.talbeSubTitle}>출시일</ThCell>
              <ThCell className={classes.talbeSubTitle}>가격</ThCell>
            </tr>
          </thead>
          <tbody>
            {mostplayedGames.map((game) => (
              <tr className={classes.trHover} key={game.id}>
                <TdCell>
                  <Link to={`/info/${game.id}`}>
                    <img
                      src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/header.jpg`}
                      className={classes.gameImage}
                      alt=""
                    />
                  </Link>
                </TdCell>
                <TdCellWhite>
                  <Link to={`/info/${game.id}`} className={classes.linkText}>
                    <GameNameCell>{game.name}</GameNameCell>
                  </Link>
                </TdCellWhite>
                <TdCellGreen>{game.releaseDate.substr(0, 10)}</TdCellGreen>
                <TdCellWhite>
                  <GameNameCell>{game.originalPrice}</GameNameCell>
                </TdCellWhite>
              </tr>
            ))}
          </tbody>
        </TalbeBox>
      </Grid>
    </Grid>
  );
}

export default TableSection;

const TalbeBox = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
`;

const ThCell = styled.th`
  color: white;
  line-height: 50px;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
  overflow: hidden;
`;

const TdCell = styled.td`
  background: rgb(22, 25, 32);
  padding: 0;
`;

const TdCellWhite = styled.td`
  background: rgb(22, 25, 32);
  font-size: 13px;
  text-align: center;
  color: white;

  padding: 0 10px;
  @media (max-width: 980px) {
    font-size: 10px;
  }
`;

const GameNameCell = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

const TdCellGreen = styled.td`
  background: rgb(22, 25, 32);
  font-size: 15px;
  text-align: center;
  color: #a3cf06;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
  overflow: hidden;
  padding: 0 10px;
  @media (max-width: 980px) {
    font-size: 10px;
  }
`;

const useStyles = makeStyles((theme) => ({
  tableTitle: {
    textAlign: "left",
    fontSize: "18px",

    "@media (max-width: 980px)": {
      fontSize: "12px",
    },
  },
  talbeSubTitle: {
    fontSize: "18px",
    "@media (max-width: 980px)": {
      fontSize: "10px",
    },
  },
  gameImage: {
    width: "100%",
    height: "60px",
    display: "inline-block",
    backgroundSize: "contain",
    verticalAlign: "middle",
  },
  grid: {
    "@media (min-width: 980px)": {
      width: "460px",
    },
  },

  linkText: {
    color: "white",
    textDecoration: "none",
  },

  trHover: {
    "&:hover td": {
      background: "rgb(72,75,82)",
    },
  },
}));
