import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

function CardList({ popularGames }) {
  return (
    <Grid container spacing={5}>
      {popularGames.map((game) => (
        <Grid item md={3} sm={4} xs={6} key={game.id}>
          <Link to={`/info/${game.id}`}>
            <GameBox>
              <div>
                <img
                  src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.id}/library_600x900.jpg`}
                  width="100%"
                  alt=""
                />
              </div>
              <Shadow>
                <Content>
                  <Title>{game.name}</Title>
                  <Intro>{game.gameDescription}</Intro>
                  <Price>{game.originalPrice}</Price>
                </Content>
              </Shadow>
            </GameBox>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default CardList;

const GameBox = styled.div`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  padding: 0;
`;
const Shadow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.5)
  );
  opacity: 0;
  transition: all 0.3s linear;

  &:hover {
    opacity: 1;
  }
`;
const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 120px;
  bottom: 0;
  & > * {
    color: #ffffff;
    margin: 10px;
    font-size: 18px;
  }
`;
const Title = styled.h3`
  margin: 0 10px 10px;
  font-weight: 300;
  line-height: 1.2em;
  font-family: "Oswald", Arial, sans-serif;
  text-transform: uppercase;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;
const Intro = styled.p`
  line-height: 15px;
  margin: 5px 10px;
  font-size: 0.9em;
  letter-spacing: 1px;
  opacity: 0.9;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  height: 46px;
`;
const Price = styled.p`
  font-family: "Oswald", Arial, sans-serif;
  font-size: 14px;
  text-align: end;
`;
