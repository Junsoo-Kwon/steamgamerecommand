import React from "react";
import styled from "styled-components";

import Infomation from "./Infomation";
import VideoSection from "./VideoSection";

function GameIntroduce({ game, isDone }) {
  return (
    <Container>
      <VideoSection id={game.id} />
      <Infomation game={game} isDone={isDone} />
    </Container>
  );
}

export default GameIntroduce;

const Container = styled.div`
  color: #fff;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: inherit;
  @media (max-width: 980px) {
    width: 100%;
  }
`;
