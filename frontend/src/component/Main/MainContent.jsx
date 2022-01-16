import React from "react";

import styled from "styled-components";

import CardList from "./CardList";
import TableSection from "./TableSection";

function MainContent({ recentGames, popularGames, mostplayedGames }) {
  return (
    <>
      <Container>
        <TableSection
          recentGames={recentGames}
          mostplayedGames={mostplayedGames}
        />
        <TitleSection>인기있는 게임</TitleSection>
        <CardList popularGames={popularGames} />
      </Container>
    </>
  );
}

export default MainContent;

const TitleSection = styled.div`
  padding: 10px;
  color: #ffffff;
  font-size: 25px;
  line-height: 50px;
  @media (min-width: 980px) {
    margin-top: 30px;
  }
`;

const Container = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
`;
