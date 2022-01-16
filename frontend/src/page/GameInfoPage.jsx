import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

import {
  GameIntroduce,
  Purchase,
  SystemRequirements,
  History,
} from "component";

function GameInfoPage({ match }) {
  let id = match.params.id;

  const [game, setGame] = useState({});
  const location = useLocation();
  const [isDone, setIsDone] = useState(true);
  const [gamehistory, setGamehistory] = useState([]);

  useEffect(() => {
    setIsDone(true);
    axios({
      method: "GET",
      url: `/api/gameinfo/${id}`,
    })
      .then((response) => {
        setGame(response.data);

        axios({
          method: "GET",
          url: `/api/gamehistory?id=${id}`,
        })
          .then((response) => {
            const list = response.data.gamehistory;

            list.map((date, idx) => {
              date.name = date.name.substr(2, 8);
            });
            setGamehistory(list.slice(1, list.length - 1));
            setIsDone(!isDone);
          })
          .catch((error) => {
            console.log(error);
            setIsDone(!isDone);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsDone(!isDone);
      });
  }, [location, id]);

  return (
    <Container
      style={{
        backgroundImage: `url(https://cdn.cloudflare.steamstatic.com/steam/apps/${id}/page_bg_generated_v6b.jpg)`,
      }}
    >
      {!isDone ? (
        <SubContainer>
          <GameTitleBox>
            <GameTitle>{game.name}</GameTitle>
          </GameTitleBox>
          <GameIntroduce game={game} isDone={isDone} />
          <Purchase id={game.id} />
          {(game.minimumRequirements !== "" ||
            game.recommendedRequirements !== "") &&
          (game.recommendedRequirements !== null ||
            game.minimumRequirements !== null) ? (
            <SystemRequirements game={game} />
          ) : (
            <></>
          )}
          {gamehistory !== null && gamehistory.length > 3 ? (
            <History gamehistory={gamehistory} />
          ) : (
            <></>
          )}
        </SubContainer>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default GameInfoPage;

const Container = styled.div`
  background: rgb(27, 40, 56);
  padding: 20px 5px;
  display: flex;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  @media (min-width: 980px) {
    padding: 40px;
  }
`;

const SubContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 960px;
  height: auto;
  position: relative;
  & > * {
    margin-top: 20px;
  }

  /* @media (min-width: 980px) {
    width: auto;
  } */
`;

const GameTitleBox = styled.div`
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  word-break: break-all;
  box-sizing: inherit;
`;

const GameTitle = styled.span`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 28px;
  color: #fff;
  text-shadow: 1px 1px 0 #000;
  flex-grow: 1;
  @media (max-width: 440px) {
    font-size: 24px;
  }
`;
